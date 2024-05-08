export type Team = {
    id: string;
    name: string;
    timePenaltyMin: number;
    challengeProgress: ChallengeProgress;
};

export type ChallengeProgress = Record<string, {
    manualUnlock?: boolean;
    manualComplete?: boolean;
    progress: boolean[] | undefined;
}>;