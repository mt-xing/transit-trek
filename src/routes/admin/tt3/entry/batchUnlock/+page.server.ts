import { CosmosClient, type PatchOperation } from '@azure/cosmos';
import { redirect } from '@sveltejs/kit';
import { DB_URL, READ_KEY, WRITE_KEY } from '$env/static/private';
import { GAME_KEY, type TT3GameState } from '../../../../../types/tt3/game';
import type { Actions, PageServerLoad, RequestEvent } from './$types';
import type { TT3ChallengeProgress, TT3Team } from '../../../../../types/tt3/team';
import type { TT3ChallengeDefinition } from '../../../../../types/tt3/challenge';
import { LOGS_KEY, logOp, writeLog } from '../../../../../types/tt3/logs';

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
	batchUnlock: async (event: RequestEvent) => {
		const data = await event.request.formData();
		const teamId = data.get('teamId') as string;
		const subtasks = data.get('subtasks') as string;
		if (!teamId || !subtasks) {
			redirect(303, '/admin/tt3/entry/batchUnlock');
			return;
		}

		const manualUnlock = boolOrUndef(data.get('manualUnlock'));
		const subtaskList = subtasks.split(',');

		const teamProgress =
			(
				await client
					.database('transit-trek')
					.container('tt3-teams')
					.item(teamId, teamId)
					.read<TT3Team>()
			).resource?.challengeProgress ?? {};

		await writeClient
			.database('transit-trek')
			.container('tt3-teams')
			.item(teamId, teamId)
			.patch(
				subtaskList.map((challengeId) => {
					if (teamProgress[challengeId] === undefined) {
						if (manualUnlock === undefined) {
							return {
								op: 'remove',
								path: `/challengeProgress/${challengeId}`,
							};
						}
						const progress: TT3ChallengeProgress[string] = {
							progress: [],
							manualUnlock,
						};
						return {
							op: 'add',
							path: `/challengeProgress/${challengeId}`,
							value: progress,
						};
					}

					return {
						op: manualUnlock === undefined ? 'remove' : 'add',
						path: `/challengeProgress/${challengeId}/manualUnlock`,
						value: manualUnlock,
					};
				}),
			);

		const time = new Date().getTime();
		await writeClient
			.database('transit-trek')
			.container('tt3-game')
			.item(LOGS_KEY, LOGS_KEY)
			.patch(
				subtaskList.map(
					(subtaskId): PatchOperation =>
						logOp({
							time,
							t: 'entryPartial',
							teamId,
							challengeId: subtaskId,
							value: { manualUnlock: manualUnlock === undefined ? 'undefined' : manualUnlock },
						}),
				),
			);

		redirect(303, '/admin/tt3/entry/batchUnlock');
	},
	complete: async (event: RequestEvent) => {
		const data = await event.request.formData();
		const teamId = data.get('teamId') as string;
		const challengeId = data.get('challengeId') as string;
		if (!teamId || !challengeId) {
			redirect(303, '/admin/tt3/entry/batchUnlock');
			return;
		}

		const manualComplete = boolOrUndef(data.get('manualComplete'));

		const teamProgress =
			(
				await client
					.database('transit-trek')
					.container('tt3-teams')
					.item(teamId, teamId)
					.read<TT3Team>()
			).resource?.challengeProgress ?? {};

		await writeClient
			.database('transit-trek')
			.container('tt3-teams')
			.item(teamId, teamId)
			.patch([
				(() => {
					if (teamProgress[challengeId] === undefined) {
						if (manualComplete === undefined) {
							return {
								op: 'remove',
								path: `/challengeProgress/${challengeId}`,
							};
						}
						const progress: TT3ChallengeProgress[string] = {
							progress: [],
							manualComplete,
						};
						return {
							op: 'add',
							path: `/challengeProgress/${challengeId}`,
							value: progress,
						};
					}

					return {
						op: manualComplete === undefined ? 'remove' : 'add',
						path: `/challengeProgress/${challengeId}/manualComplete`,
						value: manualComplete,
					};
				})(),
			]);

		await writeLog({
			t: 'entryPartial',
			teamId,
			challengeId,
			value: {
				manualComplete: manualComplete === undefined ? 'undefined' : manualComplete,
			},
		});

		redirect(303, '/admin/tt3/entry/batchUnlock');
	},
} satisfies Actions;
