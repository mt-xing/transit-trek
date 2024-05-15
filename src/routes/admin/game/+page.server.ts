import { CosmosClient } from '@azure/cosmos';
import { redirect } from '@sveltejs/kit';
import { DB_URL, READ_KEY, WRITE_KEY } from '$env/static/private';
import { GAME_KEY, type GameState } from '../../../types/game';
import type { Actions, PageServerLoad, RequestEvent } from './$types';

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

export const load: PageServerLoad = async () => ({
	gameState: await getGameState(),
});

const writeClient = new CosmosClient({
	endpoint: DB_URL,
	key: WRITE_KEY,
});

export const actions = {
	countdown: async () => {
		const gameState: GameState = {
			t: "pre",
			countdown: true,
		};
		await writeClient
			.database('transit-trek')
			.container('game')
			.item(GAME_KEY, GAME_KEY)
			.replace({ ...gameState, id: GAME_KEY });

		redirect(303, '/admin/game');
	},
	startGame: async () => {
		const gameState: GameState = {
			t: "ongoing",
			startTime: (new Date()).getTime(),
		};
		await writeClient
			.database('transit-trek')
			.container('game')
			.item(GAME_KEY, GAME_KEY)
			.replace({ ...gameState, id: GAME_KEY });

		redirect(303, '/admin/game');
	},
	endGame: async () => {
		const current = await getGameState();
		if (current?.t !== 'ongoing') {
			redirect(303, '/admin/game');
			return;
		}
		const gameState: GameState = {
			t: "post",
			startTime: current.startTime,
		};
		await writeClient
			.database('transit-trek')
			.container('game')
			.item(GAME_KEY, GAME_KEY)
			.replace({ ...gameState, id: GAME_KEY });

		redirect(303, '/admin/game');
	},
	resumeGame: async () => {
		const current = await getGameState();
		if (current?.t !== 'post') {
			redirect(303, '/admin/game');
			return;
		}
		const gameState: GameState = {
			t: "ongoing",
			startTime: current.startTime,
		};
		await writeClient
			.database('transit-trek')
			.container('game')
			.item(GAME_KEY, GAME_KEY)
			.replace({ ...gameState, id: GAME_KEY });

		redirect(303, '/admin/game');
	},
	changeTime: async (event: RequestEvent) => {

		const data = await event.request.formData();
		const current = await getGameState();
		if (!current || current.t === 'pre') {
			redirect(303, '/admin/game');
			return;
		}
		const gameState: GameState = {
			t: current.t,
			startTime: parseInt(data.get('startTime') as string, 10)
		};
		await writeClient
			.database('transit-trek')
			.container('game')
			.item(GAME_KEY, GAME_KEY)
			.replace({ ...gameState, id: GAME_KEY });

		redirect(303, '/admin/game');
	},
	resetDanger: async (event: RequestEvent) => {
		const data = await event.request.formData();
		const sanityString = data.get("sanityString") as string;
		if (sanityString !== 'reset') {
			redirect(303, '/admin/game');
			return;
		}
		const gameState: GameState = {
			t: 'pre',
			countdown: false,
		};
		await writeClient
			.database('transit-trek')
			.container('game')
			.item(GAME_KEY, GAME_KEY)
			.replace({ ...gameState, id: GAME_KEY });

		redirect(303, '/admin/game');
	},
} satisfies Actions;
