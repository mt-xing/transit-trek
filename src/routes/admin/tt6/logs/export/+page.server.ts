import { CosmosClient } from '@azure/cosmos';
import { error } from '@sveltejs/kit';
import { DB_URL, READ_KEY } from '$env/static/private';
import type { PageServerLoad } from './$types';
import { type TT6ChallengeDefinition } from '../../../../../types/tt6/challenge';
import type { TT6Team } from '../../../../../types/tt6/team';

const client = new CosmosClient({
	endpoint: DB_URL,
	key: READ_KEY,
});

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.getSession();
	if (!session) {
		throw error(401, 'Forbidden');
	}

	const [res, teamRes] = await Promise.all([
		client
			.database('transit-trek')
			.container('tt6-challenges')
			.items.query({query: 'SELECT * FROM c ORDER BY c.sort ASC'})
			.fetchAll(),
		client.database('transit-trek')
			.container('tt6-teams')
			.items.readAll<TT6Team>()
			.fetchAll(),
	]);

	return {
		rawChallenges: res.resources as TT6ChallengeDefinition[],
		teams: teamRes.resources,
	};
};