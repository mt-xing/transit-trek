import { CosmosClient, type PatchRequestBody } from '@azure/cosmos';
import { redirect } from '@sveltejs/kit';
import { DB_URL, READ_KEY, WRITE_KEY } from '$env/static/private';
import { GAME_KEY, type ETT1GameState } from '../../../../types/ett1/game';
import type { Actions, PageServerLoad, RequestEvent } from './$types';
import type { ETT1ChallengeProgress, ETT1Team } from '../../../../types/ett1/team';
import type { ETT1ChallengeDefinition } from '../../../../types/ett1/challenge';
import { isEtt1ChallengeComplete } from '../../../../utils/ett1/challenge';
import { writeEtt1Log } from '../../../../types/ett1/logs';

const client = new CosmosClient({
	endpoint: DB_URL,
	key: READ_KEY,
});

async function getGameState() {
	const res = await client
		.database('transit-trek')
		.container('ett1-game')
		.item(GAME_KEY, GAME_KEY)
		.read<ETT1GameState>();
	return res.resource;
}

export const load: PageServerLoad = async () => {
	const [res, gameState, challengeRes] = await Promise.all([
		client.database('transit-trek').container('ett1-teams').items.readAll<ETT1Team>().fetchAll(),
		getGameState(),
		client
			.database('transit-trek')
			.container('ett1-challenges')
			.items.readAll<ETT1ChallengeDefinition>()
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
			redirect(303, '/admin/ett1/entry');
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

		const newVal: ETT1ChallengeProgress[string] = {
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
				.container('ett1-teams')
				.item(teamId, teamId)
				.read<ETT1Team>()
		).resource;
		const challenge = JSON.parse(data.get('challengeJson') as string) as ETT1ChallengeDefinition;
		const score = challenge.points;
		if (existingTeam && challenge && score) {
			const originallyComplete = isEtt1ChallengeComplete(challenge, existingTeam.challengeProgress);
			const nowComplete = isEtt1ChallengeComplete(challenge, {
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
			.container('ett1-teams')
			.item(teamId, teamId)
			.patch(patchOps);

		await writeEtt1Log({
			t: 'entry',
			teamId,
			challengeId,
			value: newVal,
		});

		redirect(303, '/admin/ett1/entry');
	},
} satisfies Actions;
