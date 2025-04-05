import { CosmosClient } from '@azure/cosmos';
import { error, json } from '@sveltejs/kit';
import { DB_URL, READ_KEY } from '$env/static/private';
import type { RequestHandler } from './$types';
import { teamEtt1Filter } from '../../util';

const client = new CosmosClient({
	endpoint: DB_URL,
	key: READ_KEY,
});

export const GET: RequestHandler = async ({ url }) => {
	const secret = url.searchParams.get('id');
	if (!secret) {
		error(401);
	}

	const teamQuery = (
		await client
			.database('transit-trek')
			.container('ett1-teams')
			.items.query({
				query: 'SELECT * from c WHERE c.secret = @secret',
				parameters: [{ name: '@secret', value: secret }],
			})
			.fetchAll()
	).resources;
	if (teamQuery.length !== 1) {
		error(401);
	}

	return json(teamEtt1Filter(teamQuery[0]));
};
