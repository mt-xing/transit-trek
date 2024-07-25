export type TT3Team = {
	id: string;
	teamNum: number;
	secret: string;
	name: string;
	timePenaltyMin: number;
	challengeProgress: TT3ChallengeProgress;
	finishTime?: number;
};

export type TT3ChallengeProgress = Record<
	string,
	{
		manualUnlock?: boolean;
		manualComplete?: boolean;
		progress: boolean[] | undefined;
	}
>;
