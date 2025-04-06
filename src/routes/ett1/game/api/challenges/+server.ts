import { CosmosClient } from '@azure/cosmos';
import { error, json, type RequestHandler } from '@sveltejs/kit';
import { DB_URL, READ_KEY } from '$env/static/private';
import { type ETT1GameState, GAME_KEY } from '../../../../../types/ett1/game';
import { publicEtt1ChallengeFilter } from '../../util';
import type { ETT1ChallengeDefinition } from '../../../../../types/ett1/challenge';

const client = new CosmosClient({
	endpoint: DB_URL,
	key: READ_KEY,
});

export const GET: RequestHandler = async ({ url }) => {
	const secret = url.searchParams.get('id');
	if (!secret) {
		error(401);
	}

	const gameStateRes = await client
		.database('transit-trek')
		.container('ett1-game')
		.item(GAME_KEY, GAME_KEY)
		.read<ETT1GameState>();

	if (!gameStateRes.resource || gameStateRes.resource.t === 'pre') {
		error(401);
	}

	const teamQuery = (
		await client
			.database('transit-trek')
			.container('ett1-teams')
			.items.query({
				query: 'SELECT * from c WHERE c.secret = @secret',
				parameters: [{ name: '@secret', value: secret }],
			})
			.fetchAll()
	).resources;
	if (teamQuery.length !== 1) {
		error(401);
	}

	const challengeRes = await client
		.database('transit-trek')
		.container('ett1-challenges')
		.items.readAll<ETT1ChallengeDefinition>()
		.fetchAll();

	return json(challengeRes.resources.map(publicEtt1ChallengeFilter));
};
