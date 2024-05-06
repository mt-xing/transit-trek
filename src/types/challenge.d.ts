export type ChallengeDefinition = {
	id: string;
	title: string;
	desc: string;
	unlockDesc?: string;
	rewardDesc?: string;
	privateNotes?: string;
	mapPos: number;
	// Map pos that must be finished to unlock this one
	unlockMapPos?: number;
} & (
		| {
			type: 'single' | 'unlimited';
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

export type ChallengeType = ChallengeDefinition['type'];
