import { CosmosClient, type PatchOperation } from '@azure/cosmos';
import { DB_URL, WRITE_KEY } from '$env/static/private';
import type { DistributiveOmit } from '../tt3/challenge';

export type TT5LogEntry = {
	time: number;
	teamId: string;
} & (
	| {
			t: 'entry';
			challengeId: string;
			value: {
				manualComplete?: boolean | string;
				progress?: boolean[];
			};
	  }
	| {
			t: 'caught';
			manualEdit?: { oldTime: number; newTime: number };
	  }
	| {
			t: 'gameState';
			text: string;
	  }
	| {
			t: 'teamEdit';
			text: string;
	  }
	| {
			t: 'teamScoreAdjust';
			amount: number;
	  }
	| {
			t: 'bioBreak';
			taken: boolean;
	  }
);

export const LOGS_KEY = 'log';

const writeClient = new CosmosClient({
	endpoint: DB_URL,
	key: WRITE_KEY,
});

export function logTt5Op(entry: TT5LogEntry): PatchOperation {
	return {
		op: 'add',
		path: '/log/-',
		value: entry,
	};
}

export async function writeTt5Log(entry: DistributiveOmit<TT5LogEntry, 'time'>) {
	await writeClient
		.database('transit-trek')
		.container('tt5-game')
		.item(LOGS_KEY, LOGS_KEY)
		.patch([logTt5Op({ ...entry, time: new Date().getTime() })]);
}
