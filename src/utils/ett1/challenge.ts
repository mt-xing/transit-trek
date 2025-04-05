import type { ETT1PublicChallengeDefinition } from "../../types/ett1/challenge";
import type { ETT1ChallengeProgress } from "../../types/ett1/team";
import assertUnreachable from "../assertUnreachable";

export function isEtt1ChallengeComplete(
	challenge: ETT1PublicChallengeDefinition,
	challengeProgress: ETT1ChallengeProgress,
): boolean {
	const manual = challengeProgress[challenge.id]?.manualComplete;
	if (manual !== undefined) {
		return manual;
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
