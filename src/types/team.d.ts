export type Team = {
    id: string;
    teamNum: number;
    secret: string;
    name: string;
    timePenaltyMin: number;
    challengeProgress: ChallengeProgress;
    finishTime?: number;
};

export type ChallengeProgress = Record<string, {
    manualUnlock?: boolean;
    manualComplete?: boolean;
    progress: boolean[] | undefined;
}>;