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

	const gameStateRes = await client
		.database('transit-trek')
		.container('game')
		.item(GAME_KEY, GAME_KEY)
		.read<GameState>();
	const gameState = gameStateFilter(gameStateRes.resource);

	const challengeRes = gameState.t !== 'pre'
		? await client
			.database('transit-trek')
			.container('challenges')
			.items.readAll<ChallengeDefinition>()
			.fetchAll()
		: { resources: [] };

	return {
		allChallenges: challengeRes.resources.map(publicChallengeFilter),
		gameState,
		team: teamFilter(teamQuery[0]),
	};
};
