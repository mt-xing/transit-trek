import type { DistributiveOmit } from "../tt3/challenge";

export type TT6ChallengeDefinition =
	& {
		id: string;
		title: string;
		desc: string;
		points: number;
		category: TT6ChallengeCategory;
		privateNotes?: string;
		bonus?: number;
		failureMsg?: string;
		failurePenalty?: number;
		shrinkTitle?: boolean;
	}
	& (
		| {
			type: "single";
		}
		| {
			type: "multi";
			partDescs: string[];
		}
	);

export type TT6PublicChallengeDefinition = DistributiveOmit<
	TT6ChallengeDefinition,
	"privateNotes"
>;

export type TT6ChallengeType = TT6ChallengeDefinition["type"];
export type TT6ChallengeCategory = "challenge" | "find" | "hard" | "hidden";

export function sortTt6Challenges<T extends TT6PublicChallengeDefinition>(
	list: T[],
): Record<TT6ChallengeCategory, T[]> {
	return list.reduce(
		(a, x) => {
			a[x.category].push(x);
			return a;
		},
		{
			hidden: [],
			challenge: [],
			find: [],
			hard: [],
		} as Record<TT6ChallengeCategory, T[]>,
	);
}

export const tt6ChallengeCategoryNames: Record<TT6ChallengeCategory, string> = {
	hidden: "Secret Challenges",
	challenge: "Challenge Tasks",
	find: "Find This",
	hard: "End-Game Tasks",
};

export function iterateTt6Categories<T>(x: Record<TT6ChallengeCategory, T>) {
	return Object.keys(x) as TT6ChallengeCategory[];
}
