import type { TT4PublicChallengeDefinition } from '../../types/tt4/challenge';
import type { TT4ChallengeProgress } from '../../types/tt4/team';
import assertUnreachable from '../assertUnreachable';

export function isTt4ChallengeComplete(
	challenge: TT4PublicChallengeDefinition,
	challengeProgress: TT4ChallengeProgress,
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
