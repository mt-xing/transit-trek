import { CosmosClient, type PatchRequestBody } from '@azure/cosmos';
import { redirect } from '@sveltejs/kit';
import { DB_URL, READ_KEY, WRITE_KEY } from '$env/static/private';
import { GAME_KEY, type TT3GameState } from '../../../../types/tt3/game';
import type { Actions, PageServerLoad, RequestEvent } from './$types';
import type { TT3ChallengeProgress, TT3Team } from '../../../../types/tt3/team';
import type { TT3ChallengeDefinition } from '../../../../types/tt3/challenge';
import { isChallengeComplete } from '../../../../utils/challenge';
import { writeLog } from '../../../../types/tt3/logs';

const client = new CosmosClient({
	endpoint: DB_URL,
	key: READ_KEY,
});

async function getGameState() {
	const res = await client
		.database('transit-trek')
		.container('tt3-game')
		.item(GAME_KEY, GAME_KEY)
		.read<TT3GameState>();
	return res.resource;
}

export const load: PageServerLoad = async () => {
	const [res, gameState, challengeRes] = await Promise.all([
		client.database('transit-trek').container('tt3-teams').items.readAll<TT3Team>().fetchAll(),
		getGameState(),
		client
			.database('transit-trek')
			.container('tt3-challenges')
			.items.readAll<TT3ChallengeDefinition>()
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
			redirect(303, '/admin/tt3/entry');
			return;
		}

		const manualUnlock = boolOrUndef(data.get('manualUnlock'));
		const manualComplete = boolOrUndef(data.get('manualComplete'));

		const max = parseInt(data.get('max') as string, 10);

		const progress = Array.from(Array(max)).fill(false);
		data
			.getAll('progress')
			.map((x: unknown) => parseInt(x as string, 10))
			.forEach((x) => {
				progress[x] = true;
			});

		const newVal: TT3ChallengeProgress[string] = {
			manualComplete,
			manualUnlock,
			progress,
		};

		const patchOps: PatchRequestBody = [
			{
				op: 'add',
				path: `/challengeProgress/${challengeId}`,
				value: newVal,
			},
		];

		if (data.get('minSubtracted') !== '') {
			const minSubtracted = parseInt(data.get('minSubtracted') as string, 10);
			const existingTeam = (
				await client
					.database('transit-trek')
					.container('tt3-teams')
					.item(teamId, teamId)
					.read<TT3Team>()
			).resource;
			const allChallenges = (
				await client
					.database('transit-trek')
					.container('tt3-challenges')
					.items.readAll<TT3ChallengeDefinition>()
					.fetchAll()
			).resources;
			const challenge = allChallenges.find((x) => x.id === challengeId);
			if (existingTeam && challenge) {
				const originallyComplete = isChallengeComplete(challenge, {
					allChallenges,
					gameState: { t: 'ongoing', startTime: 1 },
					challengeProgress: existingTeam.challengeProgress,
				});
				const nowComplete = isChallengeComplete(challenge, {
					allChallenges,
					gameState: { t: 'ongoing', startTime: 1 },
					challengeProgress: { ...existingTeam.challengeProgress, [challengeId]: newVal },
				});

				if (!originallyComplete && nowComplete) {
					patchOps.push({
						op: 'incr',
						path: '/timePenaltyMin',
						value: -1 * minSubtracted,
					});
				} else if (originallyComplete && !nowComplete) {
					patchOps.push({
						op: 'incr',
						path: '/timePenaltyMin',
						value: minSubtracted,
					});
				}
			}
		}

		await writeClient
			.database('transit-trek')
			.container('tt3-teams')
			.item(teamId, teamId)
			.patch(patchOps);

		await writeLog({
			t: 'entry',
			teamId,
			challengeId,
			value: newVal,
		});

		redirect(303, '/admin/tt3/entry');
	},
} satisfies Actions;
