import { CosmosClient } from '@azure/cosmos';
import { redirect } from '@sveltejs/kit';
import { DB_URL, READ_KEY, WRITE_KEY } from '$env/static/private';
import type { Actions, PageServerLoad, RequestEvent } from './$types';
import { LOGS_KEY, type ETT1LogEntry } from '../../../../types/ett1/logs';

const client = new CosmosClient({
	endpoint: DB_URL,
	key: READ_KEY,
});

export const load: PageServerLoad = async () => ({
	logs: (
		await client
			.database('transit-trek')
			.container('ett1-game')
			.item(LOGS_KEY, LOGS_KEY)
			.read<{ log: ETT1LogEntry[] }>()
	).resource,
});

const writeClient = new CosmosClient({
	endpoint: DB_URL,
	key: WRITE_KEY,
});

export const actions = {
	resetDanger: async (event: RequestEvent) => {
		const data = await event.request.formData();
		const sanityString = data.get('sanityString') as string;
		if (sanityString !== 'reset') {
			redirect(303, '/admin/ett1/logs');
			return;
		}

		await writeClient
			.database('transit-trek')
			.container('ett1-game')
			.item(LOGS_KEY, LOGS_KEY)
			.replace({ id: LOGS_KEY, log: [] });

		redirect(303, '/admin/ett1/logs');
	},
} satisfies Actions;
