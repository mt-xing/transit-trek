import { CosmosClient } from '@azure/cosmos';
import type { PageServerLoad } from './$types';
import { DB_URL, READ_KEY } from '$env/static/private';
import type { ETT1ChallengeDefinition } from '../../../../../types/ett1/challenge';

const client = new CosmosClient({
	endpoint: DB_URL,
	key: READ_KEY,
});

export const load: PageServerLoad = async ({ url }) => {
	const id = url.searchParams.get('id');
	if (id) {
		const res = await client
			.database('transit-trek')
			.container('ett1-challenges')
			.item(id, id)
			.read<ETT1ChallengeDefinition>();
		return {
			challenge: res.resource,
		};
	}
	return {};
};
