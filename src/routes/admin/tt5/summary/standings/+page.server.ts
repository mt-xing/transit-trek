import { CosmosClient } from '@azure/cosmos';
import type { PageServerLoad } from './$types';
import { DB_URL, READ_KEY } from '$env/static/private';
import type { TT5Team } from '../../../../../types/tt5/team';

const client = new CosmosClient({
	endpoint: DB_URL,
	key: READ_KEY,
});

export const load: PageServerLoad = async () => {
	const res = await client
		.database('transit-trek')
		.container('tt5-teams')
		.items.readAll<TT5Team>()
		.fetchAll();

	return {
		teams: res.resources,
	};
};
