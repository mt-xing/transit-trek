export type Team = {
    id: string;
    name: string;
    timePenaltyMin: number;
    challengeProgress: ChallengeProgress;
};

export type ChallengeProgress = Record<string, boolean[] | undefined>;