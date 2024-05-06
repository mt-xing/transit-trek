import { CosmosClient } from '@azure/cosmos';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad, RequestEvent } from './$types';
import { DB_URL, READ_KEY, WRITE_KEY } from '$env/static/private';
import type { ChallengeDefinition, ChallengeType } from '../../../types/challenge';
import assertUnreachable from '../../../utils/assertUnreachable';

const client = new CosmosClient({
	endpoint: DB_URL,
	key: READ_KEY,
});

export const load: PageServerLoad = async ({ url }) => {
	const id = url.searchParams.get('id');
	if (id) {
		const res = await client
			.database('transit-trek')
			.container('challenges')
			.item(id, id)
			.read<ChallengeDefinition>();
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
		if (!id) { return; }

		const challengeBase = {
			id,
			title: data.get('title') as string,
			desc: data.get('desc') as string,
			unlockDesc: (data.get('unlockDesc') as string) || undefined,
			rewardDesc: (data.get('rewardDesc') as string) || undefined,
			privateNotes: (data.get('privateNotes') as string) || undefined,
			mapPos: parseInt(data.get('mapPos') as string, 10),
			unlockMapPos: data.get('unlockMapPosActive') ? parseInt(data.get('unlockMapPos') as string, 10) : undefined,
		};
		const type = data.get('type') as ChallengeType;
		const newChallengeInfo = ((): ChallengeDefinition => {
			switch (type) {
				case 'single':
				case 'unlimited':
					return { type, ...challengeBase };
				case 'multi':
					return {
						...challengeBase,
						type: 'multi',
						partDescs: Array.from(Array(parseInt(data.get('partDescsLength') as string, 10))).map((_, i) => data.get(`partDescs${i}`) as string)
					}
				case 'subtask':
					return {
						...challengeBase,
						type: 'subtask',
						subtaskInfo: {
							mapPos: parseInt(data.get('subtaskMapPos') as string, 10),
							minRequired: parseInt(data.get('subtaskMinRequired') as string, 10),
						}
					}
				default:
					return assertUnreachable(type);
			}
		})();

		await writeClient
			.database('transit-trek')
			.container('challenges')
			.item(id, id)
			.replace(newChallengeInfo);

		redirect(303, '/admin/challenges');
	},
} satisfies Actions;
