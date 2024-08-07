import { CosmosClient } from '@azure/cosmos';
import { json } from '@sveltejs/kit';
import { DB_URL, READ_KEY } from '$env/static/private';
import { GAME_KEY, type TT3GameState } from '../../../../../types/tt3/game';
import { gameStateFilter } from '../../util';

const client = new CosmosClient({
	endpoint: DB_URL,
	key: READ_KEY,
});

export async function GET() {
	const gameStateRes = await client
		.database('transit-trek')
		.container('tt3-game')
		.item(GAME_KEY, GAME_KEY)
		.read<TT3GameState>();
	const gameState = gameStateFilter(gameStateRes.resource);

	return json(gameState);
}
