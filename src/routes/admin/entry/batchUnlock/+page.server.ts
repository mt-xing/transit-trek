import { CosmosClient, type PatchOperation } from '@azure/cosmos';
import { redirect } from '@sveltejs/kit';
import { DB_URL, READ_KEY, WRITE_KEY } from '$env/static/private';
import { GAME_KEY, type GameState } from '../../../../types/game';
import type { Actions, PageServerLoad, RequestEvent } from './$types';
import type { ChallengeProgress, Team } from '../../../../types/team';
import type { ChallengeDefinition } from '../../../../types/challenge';
import { LOGS_KEY, logOp, writeLog } from '../../../../types/logs';

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
	batchUnlock: async (event: RequestEvent) => {
		const data = await event.request.formData();
		const teamId = data.get("teamId") as string;
		const subtasks = data.get("subtasks") as string;
		if (!teamId || !subtasks) {
			redirect(303, '/admin/entry/batchUnlock');
			return;
		}

		const manualUnlock = boolOrUndef(data.get("manualUnlock"));
		const subtaskList = subtasks.split(",");

		const teamProgress = (await client
			.database('transit-trek')
			.container('teams')
			.item(teamId, teamId)
			.read<Team>()).resource?.challengeProgress ?? {};

		await writeClient
			.database('transit-trek')
			.container('teams')
			.item(teamId, teamId)
			.patch(subtaskList.map(challengeId => {
				if (teamProgress[challengeId] === undefined) {
					if (manualUnlock === undefined) {
						return {
							op: 'remove',
							path: `/challengeProgress/${challengeId}`,
						};
					}
					const progress: ChallengeProgress[string] = {
						progress: [],
						manualUnlock,
					}
					return {
						op: 'add',
						path: `/challengeProgress/${challengeId}`,
						value: progress,
					};
				}

				return {
					op: manualUnlock === undefined ? 'remove' : 'add',
					path: `/challengeProgress/${challengeId}/manualUnlock`,
					value: manualUnlock
				};
			}));

		const time = (new Date()).getTime();
		await writeClient
			.database('transit-trek')
			.container('game')
			.item(LOGS_KEY, LOGS_KEY)
			.patch(subtaskList.map((subtaskId): PatchOperation => logOp({
				time,
				t: 'entryPartial',
				teamId,
				challengeId: subtaskId,
				value: { manualUnlock: manualUnlock === undefined ? 'undefined' : manualUnlock }
			})));

		redirect(303, '/admin/entry/batchUnlock');
	},
	complete: async (event: RequestEvent) => {
		const data = await event.request.formData();
		const teamId = data.get("teamId") as string;
		const challengeId = data.get("challengeId") as string;
		if (!teamId || !challengeId) {
			redirect(303, '/admin/entry/batchUnlock');
			return;
		}

		const manualComplete = boolOrUndef(data.get("manualComplete"));

		const teamProgress = (await client
			.database('transit-trek')
			.container('teams')
			.item(teamId, teamId)
			.read<Team>()).resource?.challengeProgress ?? {};

		await writeClient
			.database('transit-trek')
			.container('teams')
			.item(teamId, teamId)
			.patch([(() => {
				if (teamProgress[challengeId] === undefined) {
					if (manualComplete === undefined) {
						return {
							op: 'remove',
							path: `/challengeProgress/${challengeId}`,
						};
					}
					const progress: ChallengeProgress[string] = {
						progress: [],
						manualComplete,
					}
					return {
						op: 'add',
						path: `/challengeProgress/${challengeId}`,
						value: progress,
					};
				}

				return {
					op: manualComplete === undefined ? 'remove' : 'add',
					path: `/challengeProgress/${challengeId}/manualComplete`,
					value: manualComplete
				};
			})()]);

		await writeLog({
			t: 'entryPartial',
			teamId,
			challengeId,
			value: {
				manualComplete: manualComplete === undefined ? 'undefined' : manualComplete
			}
		})

		redirect(303, '/admin/entry/batchUnlock');
	},
} satisfies Actions;
