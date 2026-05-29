import { CosmosClient } from '@azure/cosmos';
import { error, json, type RequestHandler } from '@sveltejs/kit';
import { DB_URL, READ_KEY } from '$env/static/private';
import { type TT6GameState, GAME_KEY } from '../../../../../types/tt6/game';
import { publicTt6ChallengeFilter } from '../../util';
import type { TT6ChallengeDefinition } from '../../../../../types/tt6/challenge';

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
		.container('tt6-game')
		.item(GAME_KEY, GAME_KEY)
		.read<TT6GameState>();

	if (!gameStateRes.resource || gameStateRes.resource.t === 'pre') {
		error(401);
	}

	const teamQuery = (
		await client
			.database('transit-trek')
			.container('tt6-teams')
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
		.container('tt6-challenges')
		.items.readAll<TT6ChallengeDefinition>()
		.fetchAll();

	return json(challengeRes.resources.map(publicTt6ChallengeFilter));
};
