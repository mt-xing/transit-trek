import type {
	TT4ChallengeDefinition,
	TT4PublicChallengeDefinition,
} from '../../../types/tt4/challenge';
import type { TT4GameState } from '../../../types/tt4/game';
import type { TT4Team } from '../../../types/tt4/team';
import assertUnreachable from '../../../utils/assertUnreachable';

export function publicTt4ChallengeFilter(x: TT4ChallengeDefinition): TT4PublicChallengeDefinition {
	const base = {
		id: x.id,
		title: x.title,
		desc: x.desc,
		points: x.points,
		category: x.category,
	};
	switch (x.type) {
		case 'single':
			return { type: 'single', ...base };
		case 'multi':
			return { type: 'multi', ...base, partDescs: x.partDescs };
		default:
			assertUnreachable(x);
	}
}

export function gameStateTt4Filter(x?: TT4GameState): TT4GameState {
	if (!x) {
		return { t: 'pre', countdown: false };
	}
	switch (x.t) {
		case 'pre':
			return { t: 'pre', countdown: x.countdown };
		case 'ongoing':
			return { t: 'ongoing', catchEnabled: x.catchEnabled };
		default:
			return {
				t: x.t,
			};
	}
}

export function teamTt4Filter(x: TT4Team): TT4Team {
	return {
		id: x.id,
		teamNum: x.teamNum,
		secret: x.secret,
		name: x.name,
		score: x.score,
		catchTimes: x.catchTimes,
		bioBreakTaken: x.bioBreakTaken,
		challengeProgress: x.challengeProgress,
	};
}
