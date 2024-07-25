export type TT3GameState =
	| {
			t: 'pre';
			countdown: boolean;
	  }
	| {
			t: 'ongoing' | 'post';
			startTime: number;
	  };

export const GAME_KEY = 'game';
