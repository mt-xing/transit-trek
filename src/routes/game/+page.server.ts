import { CosmosClient } from '@azure/cosmos';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { DB_URL, READ_KEY } from '$env/static/private';
import type { ChallengeDefinition } from '../../types/challenge';
import { GAME_KEY, type GameState } from '../../types/game';
import { gameStateFilter, publicChallengeFilter, teamFilter } from './util';

const client = new CosmosClient({
	endpoint: DB_URL,
	key: READ_KEY,
});

export const load: PageServerLoad = async ({ url }) => {
	const id = url.searchParams.get('id');
	if (!id) {
		error(401, "No Arjun Allowed");
		return;
	}

	const teamQuery = (await client
		.database('transit-trek')
		.container('teams')
		.items
		.query({
			query: 'SELECT * from c WHERE c.secret = @secret',
			parameters: [{ name: '@secret', value: id }],
		})
		.fetchAll()).resources;
	if (teamQuery.length !== 1) {
		error(401, "No Arjun Allowed");
		return;
	}

	const gameStateRes = await client
		.database('transit-trek')
		.container('game')
		.item(GAME_KEY, GAME_KEY)
		.read<GameState>();
	const gameState = gameStateFilter(gameStateRes.resource);

	const challengeRes = gameState.t !== 'pre'
		? await client
			.database('transit-trek')
			.container('challenges')
			.items.readAll<ChallengeDefinition>()
			.fetchAll()
		: { resources: [] };

	return {
		allChallenges: challengeRes.resources.map(publicChallengeFilter),
		gameState,
		team: teamFilter(teamQuery[0]),
	};
};
