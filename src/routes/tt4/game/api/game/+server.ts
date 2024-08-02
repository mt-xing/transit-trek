import { CosmosClient } from '@azure/cosmos';
import { json } from '@sveltejs/kit';
import { DB_URL, READ_KEY } from '$env/static/private';
import { GAME_KEY, type TT4GameState } from '../../../../../types/tt4/game';
import { gameStateTt4Filter } from '../../util';

const client = new CosmosClient({
	endpoint: DB_URL,
	key: READ_KEY,
});

export async function GET() {
	const gameStateRes = await client
		.database('transit-trek')
		.container('tt4-game')
		.item(GAME_KEY, GAME_KEY)
		.read<TT4GameState>();
	const gameState = gameStateTt4Filter(gameStateRes.resource);

	return json(gameState);
}
