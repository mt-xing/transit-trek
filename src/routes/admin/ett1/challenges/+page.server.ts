import { CosmosClient } from '@azure/cosmos';
import { error, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { DB_URL, READ_KEY, WRITE_KEY } from '$env/static/private';
import { type ETT1ChallengeDefinition } from '../../../../types/ett1/challenge';
import type { DistributiveOmit } from '../../../../types/tt3/challenge';

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
		.container('ett1-challenges')
		.items.readAll<ETT1ChallengeDefinition>()
		.fetchAll();

	return {
		challenges: res.resources,
	};
};

const writeClient = new CosmosClient({
	endpoint: DB_URL,
	key: WRITE_KEY,
});

export const actions = {
	newChallenge: async () => {
		const emptyChallenge: DistributiveOmit<ETT1ChallengeDefinition, 'id'> = {
			title: '',
			desc: '',
			type: 'single',
			points: 0,
			category: 'challenge',
		};
		await writeClient
			.database('transit-trek')
			.container('ett1-challenges')
			.items.create(emptyChallenge);

		redirect(303, '/admin/ett1/challenges');
	},
} satisfies Actions;
