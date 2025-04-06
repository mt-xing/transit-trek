import { CosmosClient } from '@azure/cosmos';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad, RequestEvent } from './$types';
import { DB_URL, READ_KEY, WRITE_KEY } from '$env/static/private';
import type { ETT1Team } from '../../../../../types/ett1/team';
import { writeEtt1Log } from '../../../../../types/ett1/logs';

const client = new CosmosClient({
	endpoint: DB_URL,
	key: READ_KEY,
});

export const load: PageServerLoad = async ({ url }) => {
	const id = url.searchParams.get('id');
	if (id) {
		const res = await client
			.database('transit-trek')
			.container('ett1-teams')
			.item(id, id)
			.read<ETT1Team>();
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
	teamName: async (event: RequestEvent) => {
		const data = await event.request.formData();
		const id = data.get('id') as string;
		if (!id) {
			redirect(303, '/admin/ett1/teamInfo');
			return;
		}

		const teamName = data.get('teamName') as string;

		await writeClient
			.database('transit-trek')
			.container('ett1-teams')
			.item(id, id)
			.patch([
				{
					op: 'replace',
					path: '/name',
					value: teamName,
				},
			]);

		await writeEtt1Log({ t: 'teamEdit', teamId: id, text: `Team Name Set: ${teamName}` });

		redirect(303, '/admin/ett1/teamInfo');
	},
	scoreAdjust: async (event: RequestEvent) => {
		const data = await event.request.formData();
		const id = data.get('id') as string;
		if (!id) {
			redirect(303, '/admin/ett1/teamInfo');
			return;
		}

		const delta = parseFloat(data.get('scoreAdjust') as string);

		await writeClient
			.database('transit-trek')
			.container('ett1-teams')
			.item(id, id)
			.patch([
				{
					op: 'incr',
					path: '/score',
					value: delta,
				},
			]);

		await writeEtt1Log({ t: 'teamScoreAdjust', teamId: id, amount: delta });

		redirect(303, '/admin/ett1/teamInfo');
	},
	bio: async (event: RequestEvent) => {
		const data = await event.request.formData();
		const id = data.get('id') as string;
		if (!id) {
			redirect(303, '/admin/ett1/teamInfo');
			return;
		}

		await writeClient
			.database('transit-trek')
			.container('ett1-teams')
			.item(id, id)
			.patch([
				{
					op: 'add',
					path: '/bioBreakTaken',
					value: true,
				},
			]);

		await writeEtt1Log({ t: 'bioBreak', teamId: id, taken: true });

		redirect(303, '/admin/ett1/teamInfo');
	},
	undoBio: async (event: RequestEvent) => {
		const data = await event.request.formData();
		const id = data.get('id') as string;
		if (!id) {
			redirect(303, '/admin/ett1/teamInfo');
			return;
		}

		await writeClient
			.database('transit-trek')
			.container('ett1-teams')
			.item(id, id)
			.patch([
				{
					op: 'add',
					path: '/bioBreakTaken',
					value: false,
				},
			]);

		await writeEtt1Log({ t: 'bioBreak', teamId: id, taken: false });

		redirect(303, '/admin/ett1/teamInfo');
	},
	catchAdjust: async (event: RequestEvent) => {
		const data = await event.request.formData();
		const id = data.get('id') as string;
		if (!id) {
			redirect(303, '/admin/ett1/teamInfo');
			return;
		}

		const rawText = data.get('catchTimes') as string;
		const newTimes = rawText.split(',').map((x) => parseInt(x, 10));

		await writeClient
			.database('transit-trek')
			.container('ett1-teams')
			.item(id, id)
			.patch([
				{
					op: 'replace',
					path: '/catchTimes',
					value: newTimes,
				},
			]);

		await writeEtt1Log({ t: 'teamEdit', teamId: id, text: `New catch times manual: ${rawText}` });

		redirect(303, '/admin/ett1/teamInfo');
	},
} satisfies Actions;
