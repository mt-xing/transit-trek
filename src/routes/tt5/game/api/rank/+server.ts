import { CosmosClient } from '@azure/cosmos';
import { error, json } from '@sveltejs/kit';
import { DB_URL, READ_KEY } from '$env/static/private';
import type { RequestHandler } from './$types';
import type { TT5Team } from '../../../../../types/tt5/team';

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
		await client.database('transit-trek').container('tt5-teams').items.readAll<TT5Team>().fetchAll()
	).resources;

	return json(teamQuery.map((x) => ({ teamNum: x.teamNum, score: x.score, name: x.name })));
};
