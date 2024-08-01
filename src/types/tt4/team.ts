export type TT4Team = {
	id: string;
	teamNum: number;
	secret: string;
	name: string;
	score: number;
	catchTimes: number[];
	challengeProgress: TT4ChallengeProgress;
	bioBreakTaken: boolean;
};

export type TT4ChallengeProgress = Record<
	string,
	{
		manualComplete?: boolean;
		progress: boolean[] | undefined;
	}
>;
