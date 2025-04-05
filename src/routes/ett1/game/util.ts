import type {
	ETT1ChallengeDefinition,
	ETT1PublicChallengeDefinition,
} from "../../../types/ett1/challenge";
import type { ETT1GameState } from "../../../types/ett1/game";
import type { ETT1Team } from "../../../types/ett1/team";
import assertUnreachable from "../../../utils/assertUnreachable";

export function publicEtt1ChallengeFilter(
	x: ETT1ChallengeDefinition,
): ETT1PublicChallengeDefinition {
	const base = {
		id: x.id,
		title: x.title,
		desc: x.desc,
		points: x.points,
		category: x.category,
		bonus: x.bonus,
	};
	switch (x.type) {
		case "single":
			return { type: "single", ...base };
		case "multi":
			return { type: "multi", ...base, partDescs: x.partDescs };
		default:
			assertUnreachable(x);
	}
}

export function gameStateEtt1Filter(x?: ETT1GameState): ETT1GameState {
	if (!x) {
		return { t: "pre", countdown: false };
	}
	switch (x.t) {
		case "pre":
			return { t: "pre", countdown: x.countdown };
		case "ongoing":
			return { t: "ongoing" };
		default:
			return {
				t: x.t,
			};
	}
}

export function teamEtt1Filter(x: ETT1Team): ETT1Team {
	return {
		id: x.id,
		teamNum: x.teamNum,
		secret: x.secret,
		name: x.name,
		score: x.score,
		bioBreakTaken: x.bioBreakTaken,
		challengeProgress: x.challengeProgress,
	};
}
