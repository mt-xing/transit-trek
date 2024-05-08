import type { PublicChallengeDefinition } from "../types/challenge";
import type { ChallengeProgress } from "../types/team";
import assertUnreachable from "./assertUnreachable";

export function isChallengeComplete(
    challenge: PublicChallengeDefinition,
    allChallenges: PublicChallengeDefinition[],
    challengeProgress: ChallengeProgress
): boolean {
    const progress = challengeProgress[challenge.id];

    switch (challenge.type) {
        case 'single':
            return progress?.[0] ?? false;
        case 'multi':
            return challenge.partDescs.every((_, i) => (progress?.[i]));
        case 'subtask': {
            const subtasks = allChallenges.filter((x) => x.mapPos === challenge.subtaskInfo.mapPos);
            const count = subtasks.reduce((a, x) => isChallengeComplete(x, allChallenges, challengeProgress) ? a + 1 : a, 0);
            return count >= challenge.subtaskInfo.minRequired;
        }
        default: assertUnreachable(challenge);
    }
}