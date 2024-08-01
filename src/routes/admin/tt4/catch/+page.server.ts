import { CosmosClient } from '@azure/cosmos';
import { redirect } from '@sveltejs/kit';
import { DB_URL, READ_KEY, WRITE_KEY } from '$env/static/private';
import type { Actions, PageServerLoad, RequestEvent } from './$types';
import type { TT4Team } from '../../../../types/tt4/team';
import { LOGS_KEY, logTt4Op } from '../../../../types/tt4/logs';

const client = new CosmosClient({
	endpoint: DB_URL,
	key: READ_KEY,
});

export const load: PageServerLoad = async () => {
	const res = await client
		.database('transit-trek')
		.container('tt4-teams')
		.items.readAll<TT4Team>()
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
	catchTeam: async (event: RequestEvent) => {
		const data = await event.request.formData();
		const id = data.get('id') as string;
		if (!id) {
			redirect(303, '/admin/tt4/finish');
			return;
		}

		const catchTime = new Date().getTime();

		await writeClient
			.database('transit-trek')
			.container('tt4-teams')
			.item(id, id)
			.patch([
				{
					op: 'add',
					path: '/catchTimes/-',
					value: catchTime,
				},
			]);

		await writeClient
			.database('transit-trek')
			.container('tt4-game')
			.item(LOGS_KEY, LOGS_KEY)
			.patch([logTt4Op({ t: 'caught', teamId: id, time: catchTime })]);

		redirect(303, '/admin/tt4/catch');
	},
} satisfies Actions;
