import type { TT6PublicChallengeDefinition } from "../../types/tt6/challenge";
import type { TT6ChallengeProgress } from "../../types/tt6/team";
import assertUnreachable from "../assertUnreachable";

export function isTt6ChallengeComplete(
	challenge: TT6PublicChallengeDefinition,
	challengeProgress: TT6ChallengeProgress,
): boolean {
	const manual = challengeProgress[challenge.id]?.manualComplete;
	if (manual !== undefined) {
		return manual;
	}

	const failed = challengeProgress[challenge.id]?.failed;
	if (failed === true) {
		return false;
	}

	const progress = challengeProgress[challenge.id];

	switch (challenge.type) {
		case "single":
			return progress?.progress?.[0] ?? false;
		case "multi":
			return challenge.partDescs.every((_, i) => progress?.progress?.[i]);
		default:
			assertUnreachable(challenge);
	}
}
