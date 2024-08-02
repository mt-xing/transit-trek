import { CosmosClient } from '@azure/cosmos';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { DB_URL, READ_KEY } from '$env/static/private';
import type { TT4ChallengeDefinition } from '../../../types/tt4/challenge';
import { GAME_KEY, type TT4GameState } from '../../../types/tt4/game';
import { gameStateTt4Filter, publicTt4ChallengeFilter, teamTt4Filter } from './util';

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
			.container('tt4-teams')
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
		.container('tt4-game')
		.item(GAME_KEY, GAME_KEY)
		.read<TT4GameState>();
	const gameState = gameStateTt4Filter(gameStateRes.resource);

	const challengeRes =
		gameState.t !== 'pre'
			? await client
					.database('transit-trek')
					.container('tt4-challenges')
					.items.readAll<TT4ChallengeDefinition>()
					.fetchAll()
			: { resources: [] };

	return {
		allChallenges: challengeRes.resources.map(publicTt4ChallengeFilter),
		gameState,
		team: teamTt4Filter(teamQuery[0]),
	};
};
