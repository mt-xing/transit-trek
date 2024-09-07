export type TT5GameState =
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
