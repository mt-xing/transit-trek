import type {
	TT6ChallengeDefinition,
	TT6PublicChallengeDefinition,
} from "../../../types/tt6/challenge";
import type { TT6GameState } from "../../../types/tt6/game";
import type { TT6ChallengeProgress, TT6Team } from "../../../types/tt6/team";
import assertUnreachable from "../../../utils/assertUnreachable";

export function publicTt6ChallengeFilter(
	challengeProgress: TT6ChallengeProgress,
	x: TT6ChallengeDefinition,
): TT6PublicChallengeDefinition {
	const base = {
		id: x.id,
		title: x.title,
		desc: x.desc,
		points: x.points,
		category: x.category,
		bonus: x.bonus,
		failureMsg: x.failureMsg,
		failurePenalty: x.failurePenalty,
		shrinkTitle: x.shrinkTitle,
		mathSupplement: undefined as (string | undefined),
		hasMathSupplement: !!x.mathSupplement,
		linkId: x.linkId,
		isLinkTarget: x.isLinkTarget,
		sort: x.sort,
	};
	if (x.mathSupplement) {
		if (challengeProgress[x.id]?.progress?.[0]) {
			base.mathSupplement = x.mathSupplement;
		}
	}
	switch (x.type) {
		case "single":
			return { type: "single", ...base };
		case "multi":
			return { type: "multi", ...base, partDescs: x.partDescs };
		default:
			assertUnreachable(x);
	}
}

export function gameStateTt6Filter(x?: TT6GameState): TT6GameState {
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

export function teamTt6Filter(x: TT6Team): TT6Team {
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
