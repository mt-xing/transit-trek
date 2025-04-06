import { CosmosClient, type PatchOperation } from '@azure/cosmos';
import { DB_URL, WRITE_KEY } from '$env/static/private';
import type { DistributiveOmit } from '../tt3/challenge';

export type ETT1LogEntry = {
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

export function logEtt1Op(entry: ETT1LogEntry): PatchOperation {
	return {
		op: 'add',
		path: '/log/-',
		value: entry,
	};
}

export async function writeEtt1Log(entry: DistributiveOmit<ETT1LogEntry, 'time'>) {
	await writeClient
		.database('transit-trek')
		.container('ett1-game')
		.item(LOGS_KEY, LOGS_KEY)
		.patch([logEtt1Op({ ...entry, time: new Date().getTime() })]);
}
