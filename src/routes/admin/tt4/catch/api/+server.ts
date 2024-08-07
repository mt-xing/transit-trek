import { CosmosClient } from '@azure/cosmos';
import { error, json } from '@sveltejs/kit';
import { DB_URL, READ_KEY } from '$env/static/private';
import type { RequestHandler } from './$types';
import type { TT4Team } from '../../../../../types/tt4/team';

const client = new CosmosClient({
	endpoint: DB_URL,
	key: READ_KEY,
});

export const GET: RequestHandler = async ({ url }) => {
	const id = url.searchParams.get('id');
	if (!id) {
		error(401);
	}

	const team = (
		await client.database('transit-trek').container('tt4-teams').item(id, id).read<TT4Team>()
	).resource;

	return json(team);
};
