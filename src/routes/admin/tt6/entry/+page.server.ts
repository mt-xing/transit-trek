import { CosmosClient, type PatchRequestBody } from '@azure/cosmos';
import { redirect } from '@sveltejs/kit';
import { DB_URL, READ_KEY, WRITE_KEY } from '$env/static/private';
import { GAME_KEY, type TT6GameState } from '../../../../types/tt6/game';
import type { Actions, PageServerLoad, RequestEvent } from './$types';
import type { TT6ChallengeProgress, TT6Team } from '../../../../types/tt6/team';
import type { TT6ChallengeDefinition } from '../../../../types/tt6/challenge';
import { isTt6ChallengeComplete } from '../../../../utils/tt6/challenge';
import { writeTt6Log } from '../../../../types/tt6/logs';

const client = new CosmosClient({
	endpoint: DB_URL,
	key: READ_KEY,
});

async function getGameState() {
	const res = await client
		.database('transit-trek')
		.container('tt6-game')
		.item(GAME_KEY, GAME_KEY)
		.read<TT6GameState>();
	return res.resource;
}

export const load: PageServerLoad = async () => {
	const [res, gameState, challengeRes] = await Promise.all([
		client.database('transit-trek').container('tt6-teams').items.readAll<TT6Team>().fetchAll(),
		getGameState(),
		client
			.database('transit-trek')
			.container('tt6-challenges')
			.items.readAll<TT6ChallengeDefinition>()
			.fetchAll(),
	]);
	return {
		teams: res.resources,
		gameState,
		challenges: challengeRes.resources,
	};
};

const writeClient = new CosmosClient({
	endpoint: DB_URL,
	key: WRITE_KEY,
});

function boolOrUndef(x: unknown) {
	if (x === 'true') {
		return true;
	}
	if (x === 'false') {
		return false;
	}
	return undefined;
}

export const actions = {
	saveProgress: async (event: RequestEvent) => {
		const data = await event.request.formData();
		const teamId = data.get('teamId') as string;
		const challengeId = data.get('challengeId') as string;
		if (!teamId || !challengeId) {
			redirect(303, '/admin/tt6/entry');
			return;
		}

		const manualComplete = boolOrUndef(data.get('manualComplete'));

		const bonus = boolOrUndef(data.get('bonusProgress'));

		const max = parseInt(data.get('max') as string, 10);

		const progress = Array.from(Array(max)).fill(false);
		data
			.getAll('progress')
			.map((x: unknown) => parseInt(x as string, 10))
			.forEach((x) => {
				progress[x] = true;
			});

		const newVal: TT6ChallengeProgress[string] = {
			manualComplete,
			bonus,
			progress,
		};

		const patchOps: PatchRequestBody = [
			{
				op: 'add',
				path: `/challengeProgress/${challengeId}`,
				value: newVal,
			},
		];

		const existingTeam = (
			await client
				.database('transit-trek')
				.container('tt6-teams')
				.item(teamId, teamId)
				.read<TT6Team>()
		).resource;
		const challenge = JSON.parse(data.get('challengeJson') as string) as TT6ChallengeDefinition;
		const score = challenge.points;
		if (existingTeam && challenge && score) {
			const originallyComplete = isTt6ChallengeComplete(challenge, existingTeam.challengeProgress);
			const nowComplete = isTt6ChallengeComplete(challenge, {
				...existingTeam.challengeProgress,
				[challengeId]: newVal,
			});

			if (!originallyComplete && nowComplete) {
				patchOps.push({
					op: 'incr',
					path: '/score',
					value: score,
				});
			} else if (originallyComplete && !nowComplete) {
				patchOps.push({
					op: 'incr',
					path: '/score',
					value: -1 * score,
				});
			}

			const originalBonus = existingTeam.challengeProgress[challenge.id]?.bonus === true;
			if (!originalBonus && bonus) {
				patchOps.push({
					op: 'incr',
					path: '/score',
					value: challenge.bonus ?? 0,
				});
			} else if (originalBonus && !bonus) {
				patchOps.push({
					op: 'incr',
					path: '/score',
					value: -1 * (challenge.bonus ?? 0),
				});
			}
		}

		await writeClient
			.database('transit-trek')
			.container('tt6-teams')
			.item(teamId, teamId)
			.patch(patchOps);

		await writeTt6Log({
			t: 'entry',
			teamId,
			challengeId,
			value: newVal,
		});

		redirect(303, '/admin/tt6/entry');
	},
} satisfies Actions;
