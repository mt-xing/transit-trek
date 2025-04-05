export type ETT1GameState =
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
