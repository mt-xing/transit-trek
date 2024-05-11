export type GameState = {
    t: 'pre',
} | {
    t: 'ongoing' | 'post',
    startTime: number,
};

export const GAME_KEY = 'game';
