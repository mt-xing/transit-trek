import { CosmosClient } from '@azure/cosmos';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { DB_URL, READ_KEY } from '$env/static/private';
import type { ETT1ChallengeDefinition } from '../../../types/ett1/challenge';
import { type ETT1GameState, GAME_KEY } from '../../../types/ett1/game';
import { gameStateEtt1Filter, publicEtt1ChallengeFilter, teamEtt1Filter } from './util';

const client = new CosmosClient({
	endpoint: DB_URL,
	key: READ_KEY,
});

export const load: PageServerLoad = async ({ url }) => {
	const id = url.searchParams.get('id');
	if (!id) {
		error(401, 'No Arjun Allowed');
		return;
	}

	const teamQuery = (
		await client
			.database('transit-trek')
			.container('ett1-teams')
			.items.query({
				query: 'SELECT * from c WHERE c.secret = @secret',
				parameters: [{ name: '@secret', value: id }],
			})
			.fetchAll()
	).resources;
	if (teamQuery.length !== 1) {
		error(401, 'No Arjun Allowed');
		return;
	}

	const gameStateRes = await client
		.database('transit-trek')
		.container('ett1-game')
		.item(GAME_KEY, GAME_KEY)
		.read<ETT1GameState>();
	const gameState = gameStateEtt1Filter(gameStateRes.resource);

	const challengeRes =
		gameState.t !== 'pre'
			? await client
					.database('transit-trek')
					.container('ett1-challenges')
					.items.readAll<ETT1ChallengeDefinition>()
					.fetchAll()
			: { resources: [] };

	return {
		allChallenges: challengeRes.resources.map(publicEtt1ChallengeFilter),
		gameState,
		team: teamEtt1Filter(teamQuery[0]),
	};
};
