import { CosmosClient, type PatchRequestBody } from '@azure/cosmos';
import { redirect } from '@sveltejs/kit';
import { DB_URL, READ_KEY, WRITE_KEY } from '$env/static/private';
import { GAME_KEY, type GameState } from '../../../types/game';
import type { Actions, PageServerLoad, RequestEvent } from './$types';
import type { ChallengeProgress, Team } from '../../../types/team';
import type { ChallengeDefinition } from '../../../types/challenge';
import { isChallengeComplete } from '../../../utils/challenge';
import { writeLog } from '../../../types/logs';

const client = new CosmosClient({
	endpoint: DB_URL,
	key: READ_KEY,
});

async function getGameState() {
	const res = await client
		.database('transit-trek')
		.container('game')
		.item(GAME_KEY, GAME_KEY)
		.read<GameState>();
	return res.resource;
}

export const load: PageServerLoad = async () => {
	const [res, gameState, challengeRes] = await Promise.all([
		client
			.database('transit-trek')
			.container('teams')
			.items.readAll<Team>()
			.fetchAll(),
		getGameState(),
		client
			.database('transit-trek')
			.container('challenges')
			.items.readAll<ChallengeDefinition>()
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
		const teamId = data.get("teamId") as string;
		const challengeId = data.get("challengeId") as string;
		if (!teamId || !challengeId) {
			redirect(303, '/admin/entry');
			return;
		}

		const manualUnlock = boolOrUndef(data.get("manualUnlock"));
		const manualComplete = boolOrUndef(data.get("manualComplete"));

		const max = parseInt(data.get('max') as string, 10);

		const progress = Array.from(Array(max)).fill(false);
		data.getAll("progress").map((x: unknown) => parseInt(x as string, 10)).forEach(x => { progress[x] = true })

		const newVal: ChallengeProgress[string] = {
			manualComplete,
			manualUnlock,
			progress
		}

		const patchOps: PatchRequestBody = [{
			op: 'add',
			path: `/challengeProgress/${challengeId}`,
			value: newVal,
		}];

		if (data.get("minSubtracted") !== "") {
			const minSubtracted = parseInt(data.get("minSubtracted") as string, 10);
			const existingTeam = (
				await client
					.database('transit-trek')
					.container('teams')
					.item(teamId, teamId)
					.read<Team>()
			).resource;
			const allChallenges = (await client
				.database('transit-trek')
				.container('challenges')
				.items.readAll<ChallengeDefinition>()
				.fetchAll()).resources;
			const challenge = allChallenges.find(x => x.id === challengeId);
			if (existingTeam && challenge) {
				const originallyComplete = isChallengeComplete(challenge, {
					allChallenges,
					gameState: { t: 'ongoing', startTime: 1 },
					challengeProgress: existingTeam.challengeProgress
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
			.container('teams')
			.item(teamId, teamId)
			.patch(patchOps);

		await writeLog({
			t: 'entry',
			teamId,
			challengeId,
			value: newVal,
		});

		redirect(303, '/admin/entry');
	},
} satisfies Actions;
