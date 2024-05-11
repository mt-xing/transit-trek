import { CosmosClient } from '@azure/cosmos';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad, RequestEvent } from './$types';
import { DB_URL, READ_KEY, WRITE_KEY } from '$env/static/private';
import type { Team } from '../../../../types/team';

const client = new CosmosClient({
	endpoint: DB_URL,
	key: READ_KEY,
});

export const load: PageServerLoad = async ({ url }) => {
	const id = url.searchParams.get('id');
	if (id) {
		const res = await client
			.database('transit-trek')
			.container('teams')
			.item(id, id)
			.read<Team>();
		return {
			team: res.resource,
		};
	}
	return {};
};

const writeClient = new CosmosClient({
	endpoint: DB_URL,
	key: WRITE_KEY,
});

export const actions = {
	default: async (event: RequestEvent) => {
		const data = await event.request.formData();
		const id = event.url.searchParams.get('id');
		if (!id) {
			redirect(303, '/admin/teams');
			return;
		}

		const name = data.get('name') as string;
		const teamNum = parseInt(data.get('teamNum') as string, 10);

		await writeClient
			.database('transit-trek')
			.container('teams')
			.item(id, id)
			.patch([{
				op: 'replace',
				path: '/name',
				value: name,
			}, {
				op: 'replace',
				path: '/teamNum',
				value: teamNum,
			}]);

		redirect(303, '/admin/teams');
	},
} satisfies Actions;
