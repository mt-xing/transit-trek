import { CosmosClient } from '@azure/cosmos';
import { error, json, type RequestHandler } from '@sveltejs/kit';
import { DB_URL, READ_KEY } from '$env/static/private';
import { GAME_KEY, type TT3GameState } from '../../../../../types/game';
import { publicChallengeFilter } from '../../util';
import type { TT3ChallengeDefinition } from '../../../../../types/challenge';

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
		.container('tt3-game')
		.item(GAME_KEY, GAME_KEY)
		.read<TT3GameState>();

	if (!gameStateRes.resource || gameStateRes.resource.t === 'pre') {
		error(401);
	}

	const teamQuery = (
		await client
			.database('transit-trek')
			.container('tt3-teams')
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
		.container('tt3-challenges')
		.items.readAll<TT3ChallengeDefinition>()
		.fetchAll();

	return json(challengeRes.resources.map(publicChallengeFilter));
};
