import type { PublicChallengeDefinition } from "./challenge"
import type { GameState } from "./game"
import type { ChallengeProgress } from "./team"

export type DashboardPassthroughInfo = {
    allChallenges: PublicChallengeDefinition[],
    challengeProgress: ChallengeProgress,
    gameState: GameState,
}