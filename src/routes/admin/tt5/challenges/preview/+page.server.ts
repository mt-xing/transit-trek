import { CosmosClient } from '@azure/cosmos';
import type { PageServerLoad } from './$types';
import { DB_URL, READ_KEY } from '$env/static/private';
import type { TT5ChallengeDefinition } from '../../../../../types/tt5/challenge';

const client = new CosmosClient({
	endpoint: DB_URL,
	key: READ_KEY,
});

export const load: PageServerLoad = async ({ url }) => {
	const id = url.searchParams.get('id');
	if (id) {
		const res = await client
			.database('transit-trek')
			.container('tt5-challenges')
			.item(id, id)
			.read<TT5ChallengeDefinition>();
		return {
			challenge: res.resource,
		};
	}
	return {};
};
