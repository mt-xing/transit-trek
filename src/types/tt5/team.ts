export type TT5Team = {
	id: string;
	teamNum: number;
	secret: string;
	name: string;
	score: number;
	challengeProgress: TT5ChallengeProgress;
	bioBreakTaken: boolean;
};

export type TT5ChallengeProgress = Record<
	string,
	{
		manualComplete?: boolean;
		bonus?: boolean;
		progress: boolean[] | undefined;
	}
>;
