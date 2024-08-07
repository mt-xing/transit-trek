import { CosmosClient } from '@azure/cosmos';
import { json } from '@sveltejs/kit';
import { DB_URL, READ_KEY } from '$env/static/private';
import type { RequestHandler } from './$types';
import { GAME_KEY, type TT4GameState } from '../../../../../types/tt4/game';

const client = new CosmosClient({
	endpoint: DB_URL,
	key: READ_KEY,
});

export const GET: RequestHandler = async () => {
	const g = (
		await client
			.database('transit-trek')
			.container('tt4-game')
			.item(GAME_KEY, GAME_KEY)
			.read<TT4GameState>()
	).resource;

	return json(g);
};
