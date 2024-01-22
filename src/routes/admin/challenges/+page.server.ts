import { CosmosClient } from '@azure/cosmos';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { DB_URL, READ_KEY } from '$env/static/private';
import type { ChallengeDefinition } from '../../../types/challenge';

const client = new CosmosClient({
	endpoint: DB_URL,
	key: READ_KEY,
});

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.getSession();
	if (!session) {
		throw error(401, 'Forbidden');
	}

	const res = await client
		.database('transit-trek')
		.container('challenges')
		.items.readAll<ChallengeDefinition>()
		.fetchAll();
	return {
		challenges: res.resources.map((c) => ({
			title: c.title,
			desc: c.desc,
			type: c.type,
			id: c.id,
		})),
	};
};
