export type Team = {
    id: number;
    name: string;
    score: number;
    history: {jsTimestamp: number, log: string}[];
    challengeStatus: Record<number, boolean[] | undefined>;
};

export type Challenge = {
    id: number;
    name: string;
    desc: string;
    point: number;
    type: {t: "one"} | {t: "multiple", num: number} | {t: "unlimited"};
};

export type DbInfo = {
    challenges: Challenge[];
    teams: Team[];
}