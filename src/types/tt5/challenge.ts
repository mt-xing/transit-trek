import type { DistributiveOmit } from '../tt3/challenge';

export type TT5ChallengeDefinition = {
	id: string;
	title: string;
	desc: string;
	points: number;
	category: TT5ChallengeCategory;
	privateNotes?: string;
	shrinkTitle: boolean;
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

export type TT5PublicChallengeDefinition = DistributiveOmit<TT5ChallengeDefinition, 'privateNotes'>;

export type TT5ChallengeType = TT5ChallengeDefinition['type'];
export type TT5ChallengeCategory = 'challenge' | 'find';

export function sortTt5Challenges<T extends TT5PublicChallengeDefinition>(
	list: T[],
): Record<TT5ChallengeCategory, T[]> {
	return list.reduce(
		(a, x) => {
			a[x.category].push(x);
			return a;
		},
		{
			challenge: [],
			find: [],
		} as Record<TT5ChallengeCategory, T[]>,
	);
}

export const tt5ChallengeCategoryNames: Record<TT5ChallengeCategory, string> = {
	challenge: 'Challenge Tasks',
	find: 'Find This',
};

export function iterateTt5Categories<T>(x: Record<TT5ChallengeCategory, T>) {
	return Object.keys(x) as TT5ChallengeCategory[];
}
