import { CosmosClient } from '@azure/cosmos';
import type { PageServerLoad } from './$types';
import { DB_URL, READ_KEY } from '$env/static/private';
import type { TT6ChallengeDefinition } from '../../../../../types/tt6/challenge';

const client = new CosmosClient({
	endpoint: DB_URL,
	key: READ_KEY,
});

export const load: PageServerLoad = async ({ url }) => {
	const id = url.searchParams.get('id');
	if (id) {
		const res = await client
			.database('transit-trek')
			.container('tt6-challenges')
			.item(id, id)
			.read<TT6ChallengeDefinition>();
		return {
			challenge: res.resource,
		};
	}
	return {};
};
