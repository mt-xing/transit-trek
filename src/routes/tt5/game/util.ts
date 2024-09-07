import type {
	TT5ChallengeDefinition,
	TT5PublicChallengeDefinition,
} from '../../../types/tt5/challenge';
import type { TT5GameState } from '../../../types/tt5/game';
import type { TT5Team } from '../../../types/tt5/team';
import assertUnreachable from '../../../utils/assertUnreachable';

export function publicTt5ChallengeFilter(x: TT5ChallengeDefinition): TT5PublicChallengeDefinition {
	const base = {
		id: x.id,
		title: x.title,
		desc: x.desc,
		points: x.points,
		category: x.category,
		shrinkTitle: x.shrinkTitle,
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

export function gameStateTt5Filter(x?: TT5GameState): TT5GameState {
	if (!x) {
		return { t: 'pre', countdown: false };
	}
	switch (x.t) {
		case 'pre':
			return { t: 'pre', countdown: x.countdown };
		case 'ongoing':
			return { t: 'ongoing' };
		default:
			return {
				t: x.t,
			};
	}
}

export function teamTt5Filter(x: TT5Team): TT5Team {
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
