import { CosmosClient } from '@azure/cosmos';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad, RequestEvent } from './$types';
import { DB_URL, READ_KEY, WRITE_KEY } from '$env/static/private';
import assertUnreachable from '../../../../../utils/assertUnreachable';
import type {
	TT4ChallengeCategory,
	TT4ChallengeDefinition,
	TT4ChallengeType,
} from '../../../../../types/tt4/challenge';

const client = new CosmosClient({
	endpoint: DB_URL,
	key: READ_KEY,
});

export const load: PageServerLoad = async ({ url }) => {
	const id = url.searchParams.get('id');
	if (id) {
		const res = await client
			.database('transit-trek')
			.container('tt4-challenges')
			.item(id, id)
			.read<TT4ChallengeDefinition>();
		return {
			challenge: res.resource,
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
			redirect(303, '/admin/tt4/challenges');
			return;
		}

		const challengeBase = {
			id,
			title: data.get('title') as string,
			desc: data.get('desc') as string,
			points: parseFloat(data.get('points') as string),
			category: data.get('category') as TT4ChallengeCategory,
			privateNotes: (data.get('privateNotes') as string) || undefined,
		};
		const type = data.get('type') as TT4ChallengeType;
		const newChallengeInfo = ((): TT4ChallengeDefinition => {
			switch (type) {
				case 'single':
					return { type, ...challengeBase };
				case 'multi':
					return {
						...challengeBase,
						type: 'multi',
						partDescs: Array.from(Array(parseInt(data.get('partDescsLength') as string, 10))).map(
							(_, i) => data.get(`partDescs${i}`) as string,
						),
					};
				case 'repeat':
					return { type, ...challengeBase };
				default:
					return assertUnreachable(type);
			}
		})();

		await writeClient
			.database('transit-trek')
			.container('tt4-challenges')
			.item(id, id)
			.replace(newChallengeInfo);

		redirect(303, '/admin/tt4/challenges');
	},
} satisfies Actions;
