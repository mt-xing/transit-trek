import { CosmosClient } from '@azure/cosmos';
import type { PageServerLoad } from './$types';
import { DB_URL, READ_KEY } from '$env/static/private';
import type { TT6Team } from '../../../../../types/tt6/team';
import type { TT6ChallengeDefinition } from '../../../../../types/tt6/challenge';

const client = new CosmosClient({
	endpoint: DB_URL,
	key: READ_KEY,
});

export const load: PageServerLoad = async () => {
	const [teamsRes, challengeRes] = await Promise.all([
		client.database('transit-trek').container('tt6-teams').items.readAll<TT6Team>().fetchAll(),
		client
			.database('transit-trek')
			.container('tt6-challenges')
			.items.readAll<TT6ChallengeDefinition>()
			.fetchAll(),
	]);

	return {
		teams: teamsRes.resources,
		challenges: challengeRes.resources,
	};
};
