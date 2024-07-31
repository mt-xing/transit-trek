import type { DistributiveOmit } from '../tt3/challenge';

export type TT4ChallengeDefinition = {
	id: string;
	title: string;
	desc: string;
	points: number;
	category: TT4ChallengeCategory;
	privateNotes?: string;
} & (
	| {
			type: 'single';
	  }
	| {
			type: 'multi';
			partDescs: string[];
	  }
);

export type TT4PublicChallengeDefinition = DistributiveOmit<TT4ChallengeDefinition, 'privateNotes'>;

export type TT4ChallengeType = TT4ChallengeDefinition['type'];
export type TT4ChallengeCategory = 'selfie' | 'experience' | 'distraction';

export function sortTt4Challenges<T extends TT4PublicChallengeDefinition>(
	list: T[],
): Record<TT4ChallengeCategory, T[]> {
	return list.reduce(
		(a, x) => {
			a[x.category].push(x);
			return a;
		},
		{
			selfie: [],
			experience: [],
			distraction: [],
		} as Record<TT4ChallengeCategory, T[]>,
	);
}

export const tt4ChallengeCategoryNames: Record<TT4ChallengeCategory, string> = {
	selfie: 'Take a Selfie',
	experience: 'Experiences',
	distraction: 'Distractions and Diversions',
};

export function iterateTt4Categories<T>(x: Record<TT4ChallengeCategory, T>) {
	return Object.keys(x) as TT4ChallengeCategory[];
}
