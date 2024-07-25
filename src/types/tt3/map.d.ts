import type { TT3PublicChallengeDefinition } from './challenge';
import type { TT3GameState } from './game';
import type { TT3ChallengeProgress } from './team';

export type TT3DashboardPassthroughInfo = {
	allChallenges: TT3PublicChallengeDefinition[];
	challengeProgress: TT3ChallengeProgress;
	gameState: TT3GameState;
};
