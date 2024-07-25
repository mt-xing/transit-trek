import { CosmosClient } from '@azure/cosmos';
import { redirect } from '@sveltejs/kit';
import { DB_URL, READ_KEY, WRITE_KEY } from '$env/static/private';
import { GAME_KEY, type GameState } from '../../../../types/game';
import type { Actions, PageServerLoad, RequestEvent } from './$types';
import type { Team } from '../../../../types/team';
import { writeLog } from '../../../../types/logs';
import type { ChallengeDefinition } from '../../../../types/challenge';

const client = new CosmosClient({
	endpoint: DB_URL,
	key: READ_KEY,
});

async function getGameState() {
	const res = await client
		.database('transit-trek')
		.container('tt3-game')
		.item(GAME_KEY, GAME_KEY)
		.read<GameState>();
	return res.resource;
}

export const load: PageServerLoad = async () => {
	const [res, gameState, challengeRes] = await Promise.all([
		client
			.database('transit-trek')
			.container('tt3-teams')
			.items.readAll<Team>()
			.fetchAll(),
		getGameState(),
		client
			.database('transit-trek')
			.container('tt3-challenges')
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

export const actions = {
	finishTeam: async (event: RequestEvent) => {
		const data = await event.request.formData();
		const id = data.get("id") as string;
		if (!id) {
			redirect(303, '/admin/tt3/finish');
			return;
		}

		await writeClient
			.database('transit-trek')
			.container('tt3-teams')
			.item(id, id)
			.patch([{
				op: 'add',
				path: '/finishTime',
				value: (new Date()).getTime(),
			}]);

		await writeLog({
			t: 'finish',
			teamId: id,
			finish: true,
		});

		redirect(303, '/admin/tt3/finish');
	},
	unfinishTeam: async (event: RequestEvent) => {
		const data = await event.request.formData();
		const id = data.get("id") as string;
		if (!id) {
			redirect(303, '/admin/tt3/finish');
			return;
		}

		await writeClient
			.database('transit-trek')
			.container('tt3-teams')
			.item(id, id)
			.patch([{
				op: 'remove',
				path: '/finishTime',
			}]);

		await writeLog({
			t: 'finish',
			teamId: id,
			finish: false,
		});

		redirect(303, '/admin/tt3/finish');
	},
	changeFinishTime: async (event: RequestEvent) => {
		const data = await event.request.formData();
		const id = data.get("id") as string;
		const finishTime = parseInt(data.get("finishTime") as string, 10);
		if (!id || Number.isNaN(finishTime)) {
			redirect(303, '/admin/tt3/finish');
			return;
		}

		await writeClient
			.database('transit-trek')
			.container('tt3-teams')
			.item(id, id)
			.patch([{
				op: 'add',
				path: '/finishTime',
				value: finishTime,
			}]);

		await writeLog({
			t: 'adjustFinish',
			teamId: id,
			newFinishTime: finishTime,
		});

		redirect(303, '/admin/tt3/finish');
	},
	changePenalty: async (event: RequestEvent) => {
		const data = await event.request.formData();
		const id = data.get("id") as string;
		const timePenaltyMin = parseInt(data.get("timePenaltyMin") as string, 10);
		if (!id || Number.isNaN(timePenaltyMin)) {
			redirect(303, '/admin/tt3/finish');
			return;
		}

		await writeClient
			.database('transit-trek')
			.container('tt3-teams')
			.item(id, id)
			.patch([{
				op: 'replace',
				path: '/timePenaltyMin',
				value: timePenaltyMin,
			}]);

		await writeLog({
			t: 'adjustPenaltyManual',
			teamId: id,
			newPenalty: timePenaltyMin,
		});

		redirect(303, '/admin/tt3/finish');
	},
} satisfies Actions;
