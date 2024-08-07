import type { TT3PublicChallengeDefinition } from '../../types/tt3/challenge';
import type { TT3DashboardPassthroughInfo } from '../../types/tt3/map';
import assertUnreachable from '../assertUnreachable';

export function isTt3ChallengeComplete(
	challenge: TT3PublicChallengeDefinition,
	info: TT3DashboardPassthroughInfo,
): boolean {
	const { challengeProgress, allChallenges } = info;

	const manual = challengeProgress[challenge.id]?.manualComplete;
	if (manual !== undefined) {
		return manual;
	}

	if (!isTt3ChallengeUnlocked(challenge, info)) {
		return false;
	}

	const progress = challengeProgress[challenge.id];

	switch (challenge.type) {
		case 'single':
			return progress?.progress?.[0] ?? false;
		case 'multi':
			return challenge.partDescs.every((_, i) => progress?.progress?.[i]);
		case 'subtask': {
			const subtasks = allChallenges.filter((x) => x.mapPos === challenge.subtaskInfo.mapPos);
			const count = subtasks.reduce((a, x) => (isTt3ChallengeComplete(x, info) ? a + 1 : a), 0);
			return count >= challenge.subtaskInfo.minRequired;
		}
		default:
			assertUnreachable(challenge);
	}
}

export function isTt3ChallengeUnlocked(
	challenge: TT3PublicChallengeDefinition,
	info: TT3DashboardPassthroughInfo,
): boolean {
	const { challengeProgress, allChallenges, gameState } = info;

	const manual = challengeProgress[challenge.id]?.manualUnlock;
	if (manual !== undefined) {
		return manual;
	}

	if (gameState.t === 'pre') {
		return false;
	}

	if (challenge.unlockMapPos === undefined) {
		return true;
	}
	const unlocks = new Set(challenge.unlockMapPos);
	const unlockChallenges = allChallenges.filter((x) => unlocks.has(x.mapPos));
	return unlockChallenges.some((x) => isTt3ChallengeComplete(x, info));
}
