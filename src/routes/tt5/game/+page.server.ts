import { CosmosClient } from '@azure/cosmos';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { DB_URL, READ_KEY } from '$env/static/private';
import type { TT5ChallengeDefinition } from '../../../types/tt5/challenge';
import { GAME_KEY, type TT5GameState } from '../../../types/tt5/game';
import { gameStateTt5Filter, publicTt5ChallengeFilter, teamTt5Filter } from './util';

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
			.container('tt5-teams')
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
		.container('tt5-game')
		.item(GAME_KEY, GAME_KEY)
		.read<TT5GameState>();
	const gameState = gameStateTt5Filter(gameStateRes.resource);

	const challengeRes =
		gameState.t !== 'pre'
			? await client
					.database('transit-trek')
					.container('tt5-challenges')
					.items.readAll<TT5ChallengeDefinition>()
					.fetchAll()
			: { resources: [] };

	return {
		allChallenges: challengeRes.resources.map(publicTt5ChallengeFilter),
		gameState,
		team: teamTt5Filter(teamQuery[0]),
	};
};
