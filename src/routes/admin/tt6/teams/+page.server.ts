import { CosmosClient } from '@azure/cosmos';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { DB_URL, READ_KEY, WRITE_KEY } from '$env/static/private';
import type { TT6Team } from '../../../../types/tt6/team';

const client = new CosmosClient({
	endpoint: DB_URL,
	key: READ_KEY,
});

export const load: PageServerLoad = async () => {
	const res = await client
		.database('transit-trek')
		.container('tt6-teams')
		.items.readAll<TT6Team>()
		.fetchAll();

	return {
		teams: res.resources,
	};
};

const writeClient = new CosmosClient({
	endpoint: DB_URL,
	key: WRITE_KEY,
});

export const actions = {
	newTeam: async () => {
		const team: Omit<TT6Team, 'id'> = {
			teamNum: -99,
			secret: crypto.randomUUID(),
			name: '',
			score: 0,
			challengeProgress: {},
			bioBreakTaken: false,
		};
		await writeClient.database('transit-trek').container('tt6-teams').items.create(team);

		redirect(303, '/admin/tt6/teams');
	},
} satisfies Actions;
