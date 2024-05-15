import type { ChallengeDefinition, PublicChallengeDefinition } from "../../types/challenge";
import type { GameState } from "../../types/game";
import type { Team } from "../../types/team";
import assertUnreachable from "../../utils/assertUnreachable";


export function publicChallengeFilter(x: ChallengeDefinition): PublicChallengeDefinition {
    const base = {
        id: x.id,
        title: x.title,
        desc: x.desc,
        rewardDesc: x.rewardDesc,
        mapPos: x.mapPos,
        unlockMapPos: x.unlockMapPos,
    };
    switch (x.type) {
        case 'single':
            return { type: 'single', ...base };
        case 'multi':
            return { type: 'multi', ...base, partDescs: x.partDescs };
        case 'subtask':
            return { type: 'subtask', ...base, subtaskInfo: x.subtaskInfo };
        default:
            assertUnreachable(x);
    }
}

export function gameStateFilter(x?: GameState): GameState {
    if (!x) {
        return { t: 'pre', countdown: false, };
    }
    switch (x.t) {
        case 'pre':
            return { t: 'pre', countdown: x.countdown };
        default:
            return {
                t: x.t,
                startTime: x.startTime,
            };
    }
}

export function teamFilter(x: Team): Team {
    return {
        id: x.id,
        teamNum: x.teamNum,
        secret: x.secret,
        name: x.name,
        timePenaltyMin: x.timePenaltyMin,
        challengeProgress: x.challengeProgress,
        finishTime: x.finishTime,
    };
}