import { CosmosClient, type PatchOperation } from "@azure/cosmos";
import { DB_URL, WRITE_KEY } from "$env/static/private";
import type { DistributiveOmit } from "../tt3/challenge";

export type TT6LogEntry =
	& {
		time: number;
		teamId: string;
	}
	& (
		| {
			t: "entry";
			challengeId: string;
			value: {
				manualComplete?: boolean | string;
				progress?: boolean[];
			};
		}
		| {
			t: "gameState";
			text: string;
		}
		| {
			t: "teamEdit";
			text: string;
		}
		| {
			t: "teamScoreAdjust";
			amount: number;
		}
		| {
			t: "bioBreak";
			taken: boolean;
		}
	);

export const LOGS_KEY = "log";

const writeClient = new CosmosClient({
	endpoint: DB_URL,
	key: WRITE_KEY,
});

export function logTt6Op(entry: TT6LogEntry): PatchOperation {
	return {
		op: "add",
		path: "/log/-",
		value: entry,
	};
}

export async function writeTt6Log(
	entry: DistributiveOmit<TT6LogEntry, "time">,
) {
	await writeClient
		.database("transit-trek")
		.container("tt6-game")
		.item(LOGS_KEY, LOGS_KEY)
		.patch([logTt6Op({ ...entry, time: new Date().getTime() })]);
}
