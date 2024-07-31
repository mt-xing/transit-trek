export type TT4Team = {
	id: string;
	teamNum: number;
	secret: string;
	name: string;
	score: number;
	catchTimes: number[];
	challengeProgress: TT4ChallengeProgress;
};

export type TT4ChallengeProgress = Record<
	string,
	{
		manualComplete?: boolean;
		progress: boolean[] | undefined;
	}
>;
