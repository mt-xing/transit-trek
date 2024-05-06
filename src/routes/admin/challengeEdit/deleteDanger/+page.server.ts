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
		const id = data.get("id") as string;
		if (!id) { return; }
		const sanityString = data.get("sanityString") as string;
		if (sanityString !== id.substring(0, 5)) {
			return;
		}

		await writeClient
			.database('transit-trek')
			.container('challenges')
			.item(id, id)
			.delete();

		redirect(303, '/admin/challenges');
	},
} satisfies Actions;
