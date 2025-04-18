import { CosmosClient } from '@azure/cosmos';
import { redirect } from '@sveltejs/kit';
import type { Actions, RequestEvent } from './$types';
import { DB_URL, WRITE_KEY } from '$env/static/private';

const writeClient = new CosmosClient({
	endpoint: DB_URL,
	key: WRITE_KEY,
});

export const actions = {
	default: async (event: RequestEvent) => {
		const data = await event.request.formData();
		const id = data.get('id') as string;
		if (!id) {
			redirect(303, '/admin/ett1/teams');
			return;
		}
		const sanityString = data.get('sanityString') as string;
		if (sanityString !== id.substring(0, 5)) {
			redirect(303, '/admin/ett1/teams');
			return;
		}

		await writeClient.database('transit-trek').container('ett1-teams').item(id, id).delete();

		redirect(303, '/admin/ett1/teams');
	},
} satisfies Actions;
