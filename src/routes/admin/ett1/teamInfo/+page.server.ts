import { CosmosClient } from '@azure/cosmos';
import type { PageServerLoad } from './$types';
import { DB_URL, READ_KEY } from '$env/static/private';
import type { ETT1Team } from '../../../../types/ett1/team';

const client = new CosmosClient({
	endpoint: DB_URL,
	key: READ_KEY,
});

export const load: PageServerLoad = async () => {
	const res = await client
		.database('transit-trek')
		.container('ett1-teams')
		.items.readAll<ETT1Team>()
		.fetchAll();

	return {
		teams: res.resources,
	};
};
