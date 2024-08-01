import { CosmosClient, type PatchOperation } from '@azure/cosmos';
import { DB_URL, WRITE_KEY } from '$env/static/private';
import type { DistributiveOmit } from '../tt3/challenge';

export type TT4LogEntry = {
	time: number;
	teamId: string;
} & (
	| {
			t: 'entry' | 'entryPartial';
			challengeId: string;
			value: {
				manualUnlock?: boolean | string;
				manualComplete?: boolean | string;
				progress?: boolean[];
			};
	  }
	| {
			t: 'finish';
			finish: boolean;
	  }
	| {
			t: 'adjustFinish';
			newFinishTime: number;
	  }
	| {
			t: 'adjustPenaltyManual';
			newPenalty: number;
	  }
);

export const LOGS_KEY = 'log';

const writeClient = new CosmosClient({
	endpoint: DB_URL,
	key: WRITE_KEY,
});

export function logTt4Op(entry: TT4LogEntry): PatchOperation {
	return {
		op: 'add',
		path: '/log/-',
		value: entry,
	};
}

export async function writeTt4Log(entry: DistributiveOmit<TT4LogEntry, 'time'>) {
	await writeClient
		.database('transit-trek')
		.container('tt4-game')
		.item(LOGS_KEY, LOGS_KEY)
		.patch([logTt4Op({ ...entry, time: new Date().getTime() })]);
}
