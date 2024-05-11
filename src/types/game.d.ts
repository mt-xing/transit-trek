export type GameState = {
    t: 'pre',
} | {
    t: 'ongoing' | 'post',
    startTime: number,
};
