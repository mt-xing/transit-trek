import { CosmosClient } from '@azure/cosmos';
import { json } from '@sveltejs/kit';
import { DB_URL, READ_KEY } from '$env/static/private';
import { GAME_KEY, type TT5GameState } from '../../../../../types/tt5/game';
import { gameStateTt5Filter } from '../../util';

const client = new CosmosClient({
	endpoint: DB_URL,
	key: READ_KEY,
});

export async function GET() {
	const gameStateRes = await client
		.database('transit-trek')
		.container('tt5-game')
		.item(GAME_KEY, GAME_KEY)
		.read<TT5GameState>();
	const gameState = gameStateTt5Filter(gameStateRes.resource);

	return json(gameState);
}
