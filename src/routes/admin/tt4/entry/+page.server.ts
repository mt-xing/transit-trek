import { CosmosClient, type PatchRequestBody } from '@azure/cosmos';
import { redirect } from '@sveltejs/kit';
import { DB_URL, READ_KEY, WRITE_KEY } from '$env/static/private';
import { GAME_KEY, type TT4GameState } from '../../../../types/tt4/game';
import type { Actions, PageServerLoad, RequestEvent } from './$types';
import type { TT4ChallengeProgress, TT4Team } from '../../../../types/tt4/team';
import type { TT4ChallengeDefinition } from '../../../../types/tt4/challenge';
import { isTt4ChallengeComplete } from '../../../../utils/tt4/challenge';
import { writeTt4Log } from '../../../../types/tt4/logs';

const client = new CosmosClient({
	endpoint: DB_URL,
	key: READ_KEY,
});

async function getGameState() {
	const res = await client
		.database('transit-trek')
		.container('tt4-game')
		.item(GAME_KEY, GAME_KEY)
		.read<TT4GameState>();
	return res.resource;
}

export const load: PageServerLoad = async () => {
	const [res, gameState, challengeRes] = await Promise.all([
		client.database('transit-trek').container('tt4-teams').items.readAll<TT4Team>().fetchAll(),
		getGameState(),
		client
			.database('transit-trek')
			.container('tt4-challenges')
			.items.readAll<TT4ChallengeDefinition>()
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
			redirect(303, '/admin/tt4/entry');
			return;
		}

		const manualComplete = boolOrUndef(data.get('manualComplete'));

		const max = parseInt(data.get('max') as string, 10);

		const progress = Array.from(Array(max)).fill(false);
		data
			.getAll('progress')
			.map((x: unknown) => parseInt(x as string, 10))
			.forEach((x) => {
				progress[x] = true;
			});

		const newVal: TT4ChallengeProgress[string] = {
			manualComplete,
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
				.container('tt4-teams')
				.item(teamId, teamId)
				.read<TT4Team>()
		).resource;
		const challenge = JSON.parse(data.get('challengeJson') as string) as TT4ChallengeDefinition;
		const score = challenge.points;
		if (existingTeam && challenge && score) {
			const originallyComplete = isTt4ChallengeComplete(challenge, existingTeam.challengeProgress);
			const nowComplete = isTt4ChallengeComplete(challenge, {
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
		}

		await writeClient
			.database('transit-trek')
			.container('tt4-teams')
			.item(teamId, teamId)
			.patch(patchOps);

		await writeTt4Log({
			t: 'entry',
			teamId,
			challengeId,
			value: newVal,
		});

		redirect(303, '/admin/tt4/entry');
	},
} satisfies Actions;
