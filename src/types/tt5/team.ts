export type TT5Team = {
	id: string;
	teamNum: number;
	secret: string;
	name: string;
	score: number;
	catchTimes: number[];
	challengeProgress: TT5ChallengeProgress;
	bioBreakTaken: boolean;
};

export type TT5ChallengeProgress = Record<
	string,
	{
		manualComplete?: boolean;
		progress: boolean[] | undefined;
	}
>;
