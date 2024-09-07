import { CosmosClient, type PatchRequestBody } from '@azure/cosmos';
import { redirect } from '@sveltejs/kit';
import { DB_URL, READ_KEY, WRITE_KEY } from '$env/static/private';
import { GAME_KEY, type TT5GameState } from '../../../../types/tt5/game';
import type { Actions, PageServerLoad, RequestEvent } from './$types';
import type { TT5ChallengeProgress, TT5Team } from '../../../../types/tt5/team';
import type { TT5ChallengeDefinition } from '../../../../types/tt5/challenge';
import { isTt5ChallengeComplete } from '../../../../utils/tt5/challenge';
import { writeTt5Log } from '../../../../types/tt5/logs';

const client = new CosmosClient({
	endpoint: DB_URL,
	key: READ_KEY,
});

async function getGameState() {
	const res = await client
		.database('transit-trek')
		.container('tt5-game')
		.item(GAME_KEY, GAME_KEY)
		.read<TT5GameState>();
	return res.resource;
}

export const load: PageServerLoad = async () => {
	const [res, gameState, challengeRes] = await Promise.all([
		client.database('transit-trek').container('tt5-teams').items.readAll<TT5Team>().fetchAll(),
		getGameState(),
		client
			.database('transit-trek')
			.container('tt5-challenges')
			.items.readAll<TT5ChallengeDefinition>()
			.fetchAll(),
	]);
	return {
		teams: res.resources,
		gameState,
		challenges: challengeRes.resources.map(x => x.shrinkTitle ? {...x, title: x.title.split(".")[0]} : x),
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
			redirect(303, '/admin/tt5/entry');
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

		const newVal: TT5ChallengeProgress[string] = {
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
				.container('tt5-teams')
				.item(teamId, teamId)
				.read<TT5Team>()
		).resource;
		const challenge = JSON.parse(data.get('challengeJson') as string) as TT5ChallengeDefinition;
		const score = challenge.points;
		if (existingTeam && challenge && score) {
			const originallyComplete = isTt5ChallengeComplete(challenge, existingTeam.challengeProgress);
			const nowComplete = isTt5ChallengeComplete(challenge, {
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
			.container('tt5-teams')
			.item(teamId, teamId)
			.patch(patchOps);

		await writeTt5Log({
			t: 'entry',
			teamId,
			challengeId,
			value: newVal,
		});

		redirect(303, '/admin/tt5/entry');
	},
} satisfies Actions;
