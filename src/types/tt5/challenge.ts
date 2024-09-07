import type { DistributiveOmit } from '../tt3/challenge';

export type TT5ChallengeDefinition = {
	id: string;
	title: string;
	desc: string;
	points: number;
	category: TT5ChallengeCategory;
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

export type TT5PublicChallengeDefinition = DistributiveOmit<TT5ChallengeDefinition, 'privateNotes'>;

export type TT5ChallengeType = TT5ChallengeDefinition['type'];
export type TT5ChallengeCategory = 'selfie' | 'experience' | 'distraction';

export function sortTt5Challenges<T extends TT5PublicChallengeDefinition>(
	list: T[],
): Record<TT5ChallengeCategory, T[]> {
	return list.reduce(
		(a, x) => {
			a[x.category].push(x);
			return a;
		},
		{
			selfie: [],
			experience: [],
			distraction: [],
		} as Record<TT5ChallengeCategory, T[]>,
	);
}

export const tt5ChallengeCategoryNames: Record<TT5ChallengeCategory, string> = {
	selfie: 'Take a Selfie',
	experience: 'Experiences',
	distraction: 'Distractions and Diversions',
};

export function iterateTt5Categories<T>(x: Record<TT5ChallengeCategory, T>) {
	return Object.keys(x) as TT5ChallengeCategory[];
}
