import { CosmosClient } from '@azure/cosmos';
import type { PageServerLoad } from './$types';
import { DB_URL, READ_KEY } from '$env/static/private';
import type { ChallengeDefinition } from '../../../types/challenge';

const client = new CosmosClient({
	endpoint: DB_URL,
	key: READ_KEY,
});

export const load: PageServerLoad = async () => {
	const res2 = await client
		.database('transit-trek')
		.container('challenges')
		.items.readAll<ChallengeDefinition>()
		.fetchAll();

	return {
		allChallenges: res2.resources,
		startTime: new Date().getTime(),
	};
};
