import { CosmosClient } from '@azure/cosmos';
import type { PageServerLoad } from './$types';
import { DB_URL, READ_KEY } from '$env/static/private';
import type { TT4ChallengeDefinition } from '../../../../../types/tt4/challenge';

const client = new CosmosClient({
	endpoint: DB_URL,
	key: READ_KEY,
});

export const load: PageServerLoad = async ({ url }) => {
	const id = url.searchParams.get('id');
	if (id) {
		const res = await client
			.database('transit-trek')
			.container('tt4-challenges')
			.item(id, id)
			.read<TT4ChallengeDefinition>();
		return {
			challenge: res.resource,
		};
	}
	return {};
};
