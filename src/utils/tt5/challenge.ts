import type { TT5PublicChallengeDefinition } from '../../types/tt5/challenge';
import type { TT5ChallengeProgress } from '../../types/tt5/team';
import assertUnreachable from '../assertUnreachable';

export function isTt5ChallengeComplete(
	challenge: TT5PublicChallengeDefinition,
	challengeProgress: TT5ChallengeProgress,
): boolean {
	const manual = challengeProgress[challenge.id]?.manualComplete;
	if (manual !== undefined) {
		return manual;
	}

	const progress = challengeProgress[challenge.id];

	switch (challenge.type) {
		case 'single':
			return progress?.progress?.[0] ?? false;
		case 'multi':
			return challenge.partDescs.every((_, i) => progress?.progress?.[i]);
		default:
			assertUnreachable(challenge);
	}
}
