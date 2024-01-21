export type ChallengeDefinition = {
	id: string;
	title: string;
	desc: string;
} & (
	| {
			type: 'single' | 'unlimited';
	  }
	| {
			type: 'multi';
			num: number;
	  }
);

export type ChallengeType = ChallengeDefinition['type'];
