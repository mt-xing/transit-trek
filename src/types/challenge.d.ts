export type ChallengeDefinition = {
	id: string;
	title: string;
	desc: string;
	rewardDesc?: string;
	privateNotes?: string;
	mapPos: number;
	// Map pos that must be finished to unlock this one
	unlockMapPos?: number[];
} & (
		| {
			type: 'single';
		}
		| {
			type: 'multi';
			partDescs: string[];
		}
		| {
			type: 'subtask';
			subtaskInfo: {
				mapPos: number;
				minRequired: number;
			}
		}
	);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DistributiveOmit<T, K extends keyof any> = T extends any
	? Omit<T, K>
	: never;
export type PublicChallengeDefinition = DistributiveOmit<ChallengeDefinition, "privateNotes">;

export type ChallengeType = ChallengeDefinition['type'];
