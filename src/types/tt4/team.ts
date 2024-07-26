export type TT4Team = {
	id: string;
	teamNum: number;
	secret: string;
	name: string;
	score: number;
	caught: number;
	mostRecentCatch?: number;
	challengeProgress: TT4ChallengeProgress;
};

export type TT4ChallengeProgress = Record<
	string,
	{
		manualComplete?: boolean;
		progress: boolean[] | undefined;
	}
>;
