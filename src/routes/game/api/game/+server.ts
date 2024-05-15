import { CosmosClient } from "@azure/cosmos";
import { json } from "@sveltejs/kit";
import { DB_URL, READ_KEY } from "$env/static/private";
import { GAME_KEY, type GameState } from "../../../../types/game";
import { gameStateFilter } from "../../util";

const client = new CosmosClient({
    endpoint: DB_URL,
    key: READ_KEY,
});

export async function GET() {
    const gameStateRes = await client
        .database('transit-trek')
        .container('game')
        .item(GAME_KEY, GAME_KEY)
        .read<GameState>();
    const gameState = gameStateFilter(gameStateRes.resource);

    return json(gameState);
}