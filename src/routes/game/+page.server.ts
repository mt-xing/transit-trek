import { CosmosClient } from '@azure/cosmos';
import type { PageServerLoad } from './$types';
import { DB_URL, READ_KEY } from '$env/static/private';
import type { ChallengeDefinition, PublicChallengeDefinition } from '../../types/challenge';
import { GAME_KEY, type GameState } from '../../types/game';
import type { Team } from '../../types/team';
import assertUnreachable from '../../utils/assertUnreachable';

const client = new CosmosClient({
	endpoint: DB_URL,
	key: READ_KEY,
});

function publicChallengeFilter(x: ChallengeDefinition): PublicChallengeDefinition {
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

function gameStateFilter(x?: GameState): GameState {
	if (!x) {
		return { t: 'pre' };
	}
	switch (x.t) {
		case 'pre':
			return { t: 'pre' };
		default:
			return {
				t: x.t,
				startTime: x.startTime,
			};
	}
}

function teamFilter(x: Team): Team {
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

export const load: PageServerLoad = async ({ url }) => {
	const id = url.searchParams.get('id');
	if (!id) {
		return {};
	}

	const teamQuery = (await client
		.database('transit-trek')
		.container('teams')
		.items
		.query({
			query: 'SELECT * from c WHERE c.secret = @secret',
			parameters: [{ name: '@secret', value: id }],
		})
		.fetchAll()).resources;
	if (teamQuery.length !== 1) {
		return {};
	}

	const challengeRes = await client
		.database('transit-trek')
		.container('challenges')
		.items.readAll<ChallengeDefinition>()
		.fetchAll();

	const gameStateRes = await client
		.database('transit-trek')
		.container('game')
		.item(GAME_KEY, GAME_KEY)
		.read<GameState>();

	return {
		allChallenges: challengeRes.resources.map(publicChallengeFilter),
		gameState: gameStateFilter(gameStateRes.resource),
		// team: {
		// 	id: 'abcd',
		// 	teamNum: 1,
		// 	secret: 'xyz',
		// 	name: '',
		// 	timePenaltyMin: 10,
		// 	challengeProgress: {
		// 		'b2afe19c-d245-4461-89e2-d373371e354a': { progress: [true] },
		// 		'a84efa50-22d3-4ff9-860f-c4f010756fdc': { progress: [true], manualUnlock: true },
		// 		'3b914c8f-e728-41d5-a142-b27f19aba575': { progress: [true] },
		// 		'843bbbb0-3ab1-417a-a1b4-a69bb06ec7af': { progress: [true, true, true] },
		// 		'08e2fc05-fca2-4f35-90ca-94e959d6571f': {
		// 			progress: [true, true],
		// 			manualUnlock: true,
		// 			manualComplete: false,
		// 		},
		// 		'6aed52ef-df4f-4bba-9fac-8aed85ce04b2': {
		// 			manualUnlock: true,
		// 			progress: undefined,
		// 		},
		// 	},
		// 	finishTime: 1715468137161,
		// } as Team,
		team: teamFilter(teamQuery[0]),
	};
};
