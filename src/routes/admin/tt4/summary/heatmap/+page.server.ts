import { CosmosClient } from '@azure/cosmos';
import type { PageServerLoad } from './$types';
import { DB_URL, READ_KEY } from '$env/static/private';
import type { TT4Team } from '../../../../../types/tt4/team';
import type { TT4ChallengeDefinition } from '../../../../../types/tt4/challenge';

const client = new CosmosClient({
	endpoint: DB_URL,
	key: READ_KEY,
});

export const load: PageServerLoad = async () => {
	const [teamsRes, challengeRes] = await Promise.all([
		client.database('transit-trek').container('tt4-teams').items.readAll<TT4Team>().fetchAll(),
		client
			.database('transit-trek')
			.container('tt4-challenges')
			.items.readAll<TT4ChallengeDefinition>()
			.fetchAll(),
	]);

	return {
		teams: teamsRes.resources,
		challenges: challengeRes.resources,
	};
};
