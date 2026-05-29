export type TT6GameState =
	| {
		t: "pre";
		countdown: boolean;
	}
	| {
		t: "ongoing";
	}
	| {
		t: "post";
	};

export const GAME_KEY = "game";
