import { CosmosClient } from '@azure/cosmos';
import { json } from '@sveltejs/kit';
import { DB_URL, READ_KEY } from '$env/static/private';
import { type ETT1GameState, GAME_KEY } from '../../../../../types/ett1/game';
import { gameStateEtt1Filter } from '../../util';

const client = new CosmosClient({
	endpoint: DB_URL,
	key: READ_KEY,
});

export async function GET() {
	const gameStateRes = await client
		.database('transit-trek')
		.container('ett1-game')
		.item(GAME_KEY, GAME_KEY)
		.read<ETT1GameState>();
	const gameState = gameStateEtt1Filter(gameStateRes.resource);

	return json(gameState);
}
