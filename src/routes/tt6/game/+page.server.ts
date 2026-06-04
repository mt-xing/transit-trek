import { CosmosClient } from "@azure/cosmos";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { DB_URL, READ_KEY } from "$env/static/private";
import type { TT6ChallengeDefinition } from "../../../types/tt6/challenge";
import { GAME_KEY, type TT6GameState } from "../../../types/tt6/game";
import {
	gameStateTt6Filter,
	publicTt6ChallengeFilter,
	teamTt6Filter,
} from "./util";
import type { TT6Team } from "../../../types/tt6/team";
import { isTt6ChallengeComplete } from "../../../utils/tt6/challenge";

const client = new CosmosClient({
	endpoint: DB_URL,
	key: READ_KEY,
});

export const load: PageServerLoad = async ({ url }) => {
	const id = url.searchParams.get("id");
	if (!id) {
		error(401, "No Arjun Allowed");
		return;
	}

	const teamQuery = (
		await client
			.database("transit-trek")
			.container("tt6-teams")
			.items.query({
				query: "SELECT * from c WHERE c.secret = @secret",
				parameters: [{ name: "@secret", value: id }],
			})
			.fetchAll()
	).resources;
	if (teamQuery.length !== 1) {
		error(401, "No Arjun Allowed");
		return;
	}

	const gameStateRes = await client
		.database("transit-trek")
		.container("tt6-game")
		.item(GAME_KEY, GAME_KEY)
		.read<TT6GameState>();
	const gameState = gameStateTt6Filter(gameStateRes.resource);

	const challengeRes = gameState.t !== "pre"
		? await client
			.database("transit-trek")
			.container("tt6-challenges")
			.items.readAll<TT6ChallengeDefinition>()
			.fetchAll()
		: { resources: [] };

	function isVisible(c: TT6ChallengeDefinition) {
		if (c.category !== "hidden") return true;
		const team: TT6Team = teamQuery[0];
		if (team.challengeProgress[c.id]?.failed) {
			return true;
		}
		if (isTt6ChallengeComplete(c, team.challengeProgress)) {
			return true;
		}
		if (team.challengeProgress[c.id]?.manualComplete !== undefined) {
			return true;
		}
		return false;
	}

	return {
		allChallenges: challengeRes.resources.filter(isVisible).map(
			publicTt6ChallengeFilter.bind(
				undefined,
				teamQuery[0].challengeProgress,
			),
		),
		gameState,
		team: teamTt6Filter(teamQuery[0]),
	};
};
