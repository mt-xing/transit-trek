import { CosmosClient } from '@azure/cosmos';
import { error, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { DB_URL, READ_KEY, WRITE_KEY } from '$env/static/private';
import type { TT3ChallengeDefinition } from '../../../../types/tt3/challenge';

const client = new CosmosClient({
	endpoint: DB_URL,
	key: READ_KEY,
});

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.getSession();
	if (!session) {
		throw error(401, 'Forbidden');
	}

	const res = await client
		.database('transit-trek')
		.container('tt3-challenges')
		.items.readAll<TT3ChallengeDefinition>()
		.fetchAll();

	return {
		challenges: res.resources.map((c) => ({
			title: c.title,
			desc: c.desc,
			type: c.type,
			id: c.id,
			mapPos: c.mapPos,
		})),
	};
};

const writeClient = new CosmosClient({
	endpoint: DB_URL,
	key: WRITE_KEY,
});

export const actions = {
	newChallenge: async () => {
		await writeClient.database('transit-trek').container('tt3-challenges').items.create({
			title: '',
			desc: '',
			type: 'single',
			mapPos: -999,
		});

		redirect(303, '/admin/tt3/challenges');
	},
} satisfies Actions;
