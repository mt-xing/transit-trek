export type ETT1Team = {
	id: string;
	teamNum: number;
	secret: string;
	name: string;
	score: number;
	challengeProgress: ETT1ChallengeProgress;
	bioBreakTaken: boolean;
};

export type ETT1ChallengeProgress = Record<
	string,
	{
		manualComplete?: boolean;
		bonus?: boolean;
		progress: boolean[] | undefined;
	}
>;
