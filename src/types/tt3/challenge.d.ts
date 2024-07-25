export type TT3ChallengeDefinition = {
	id: string;
	title: string;
	desc: string;
	rewardDesc?: string;
	privateNotes?: string;
	mapPos: number;
	// Map pos that must be finished to unlock this one
	unlockMapPos?: number[];
	minSubtracted?: number;
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
			};
	  }
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DistributiveOmit<T, K extends keyof any> = T extends any ? Omit<T, K> : never;
export type TT3PublicChallengeDefinition = DistributiveOmit<TT3ChallengeDefinition, 'privateNotes'>;

export type TT3ChallengeType = TT3ChallengeDefinition['type'];
