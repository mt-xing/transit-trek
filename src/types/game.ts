export type GameState = {
    t: 'pre',
    countdown: boolean,
} | {
    t: 'ongoing' | 'post',
    startTime: number,
};

export const GAME_KEY = 'game';
