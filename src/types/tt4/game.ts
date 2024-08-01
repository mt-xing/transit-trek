export type TT4GameState =
	| {
			t: 'pre';
			countdown: boolean;
	  }
	| {
			t: 'ongoing';
			catchEnabled: boolean;
	  }
	| {
			t: 'post';
	  };

export const GAME_KEY = 'game';
