export type TT6Team = {
	id: string;
	teamNum: number;
	secret: string;
	name: string;
	score: number;
	challengeProgress: TT6ChallengeProgress;
	bioBreakTaken: boolean;
};

export type TT6ChallengeProgress = Record<
	string,
	{
		manualComplete?: boolean;
		failed?: boolean;
		bonus?: boolean;
		progress: boolean[] | undefined;
	}
>;
