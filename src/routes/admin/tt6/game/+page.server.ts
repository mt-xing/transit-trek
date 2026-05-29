import { CosmosClient } from '@azure/cosmos';
import { redirect } from '@sveltejs/kit';
import { DB_URL, READ_KEY, WRITE_KEY } from '$env/static/private';
import { GAME_KEY, type TT6GameState } from '../../../../types/tt6/game';
import type { Actions, PageServerLoad, RequestEvent } from './$types';
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

export const load: PageServerLoad = async () => ({
	gameState: await getGameState(),
});

const writeClient = new CosmosClient({
	endpoint: DB_URL,
	key: WRITE_KEY,
});

export const actions = {
	countdown: async () => {
		const gameState: TT6GameState = {
			t: 'pre',
			countdown: true,
		};
		await writeClient
			.database('transit-trek')
			.container('tt6-game')
			.item(GAME_KEY, GAME_KEY)
			.replace({ ...gameState, id: GAME_KEY });

		redirect(303, '/admin/tt6/game');
	},
	startGame: async () => {
		const gameState: TT6GameState = {
			t: 'ongoing',
		};
		await writeClient
			.database('transit-trek')
			.container('tt6-game')
			.item(GAME_KEY, GAME_KEY)
			.replace({ ...gameState, id: GAME_KEY });

		await writeTt6Log({ t: 'gameState', teamId: '', text: 'Start Game' });

		redirect(303, '/admin/tt6/game');
	},
	endGame: async () => {
		const current = await getGameState();
		if (current?.t !== 'ongoing') {
			redirect(303, '/admin/tt6/game');
			return;
		}
		const gameState: TT6GameState = {
			t: 'post',
		};
		await writeClient
			.database('transit-trek')
			.container('tt6-game')
			.item(GAME_KEY, GAME_KEY)
			.replace({ ...gameState, id: GAME_KEY });

		await writeTt6Log({ t: 'gameState', teamId: '', text: 'End Game' });

		redirect(303, '/admin/tt6/game');
	},
	resumeGame: async () => {
		const current = await getGameState();
		if (current?.t !== 'post') {
			redirect(303, '/admin/tt6/game');
			return;
		}
		const gameState: TT6GameState = {
			t: 'ongoing',
		};
		await writeClient
			.database('transit-trek')
			.container('tt6-game')
			.item(GAME_KEY, GAME_KEY)
			.replace({ ...gameState, id: GAME_KEY });

		await writeTt6Log({ t: 'gameState', teamId: '', text: 'Resume Game' });

		redirect(303, '/admin/tt6/game');
	},
	resetDanger: async (event: RequestEvent) => {
		const data = await event.request.formData();
		const sanityString = data.get('sanityString') as string;
		if (sanityString !== 'reset') {
			redirect(303, '/admin/tt6/game');
			return;
		}
		const gameState: TT6GameState = {
			t: 'pre',
			countdown: false,
		};
		await writeClient
			.database('transit-trek')
			.container('tt6-game')
			.item(GAME_KEY, GAME_KEY)
			.replace({ ...gameState, id: GAME_KEY });

		await writeTt6Log({ t: 'gameState', teamId: '', text: 'Reset Game' });

		redirect(303, '/admin/tt6/game');
	},
} satisfies Actions;
