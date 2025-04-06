import type { DistributiveOmit } from '../tt3/challenge';

export type ETT1ChallengeDefinition = {
	id: string;
	title: string;
	desc: string;
	points: number;
	category: ETT1ChallengeCategory;
	privateNotes?: string;
	bonus?: number;
} & (
	| {
			type: 'single';
	  }
	| {
			type: 'multi';
			partDescs: string[];
	  }
);

export type ETT1PublicChallengeDefinition = DistributiveOmit<
	ETT1ChallengeDefinition,
	'privateNotes'
>;

export type ETT1ChallengeType = ETT1ChallengeDefinition['type'];
export type ETT1ChallengeCategory = 'challenge' | 'find';

export function sortEtt1Challenges<T extends ETT1PublicChallengeDefinition>(
	list: T[],
): Record<ETT1ChallengeCategory, T[]> {
	return list.reduce(
		(a, x) => {
			a[x.category].push(x);
			return a;
		},
		{
			challenge: [],
			find: [],
		} as Record<ETT1ChallengeCategory, T[]>,
	);
}

export const ett1ChallengeCategoryNames: Record<ETT1ChallengeCategory, string> = {
	challenge: 'Challenge Tasks',
	find: 'Find This',
};

export function iterateEtt1Categories<T>(x: Record<ETT1ChallengeCategory, T>) {
	return Object.keys(x) as ETT1ChallengeCategory[];
}
