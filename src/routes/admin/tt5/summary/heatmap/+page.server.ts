import { CosmosClient } from '@azure/cosmos';
import type { PageServerLoad } from './$types';
import { DB_URL, READ_KEY } from '$env/static/private';
import type { TT5Team } from '../../../../../types/tt5/team';
import type { TT5ChallengeDefinition } from '../../../../../types/tt5/challenge';

const client = new CosmosClient({
	endpoint: DB_URL,
	key: READ_KEY,
});

export const load: PageServerLoad = async () => {
	const [teamsRes, challengeRes] = await Promise.all([
		client.database('transit-trek').container('tt5-teams').items.readAll<TT5Team>().fetchAll(),
		client
			.database('transit-trek')
			.container('tt5-challenges')
			.items.readAll<TT5ChallengeDefinition>()
			.fetchAll(),
	]);

	return {
		teams: teamsRes.resources,
		challenges: challengeRes.resources,
	};
};
