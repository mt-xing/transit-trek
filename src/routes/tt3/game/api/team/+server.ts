import { CosmosClient } from "@azure/cosmos";
import { error, json } from "@sveltejs/kit";
import { DB_URL, READ_KEY } from "$env/static/private";
import { teamFilter } from "../../util";
import type { RequestHandler } from "./$types";

const client = new CosmosClient({
    endpoint: DB_URL,
    key: READ_KEY,
});

export const GET: RequestHandler = async ({ url }) => {
    const secret = url.searchParams.get('id');
    if (!secret) {
        error(401);
    }

    const teamQuery = (await client
        .database('transit-trek')
        .container('tt3-teams')
        .items
        .query({
            query: 'SELECT * from c WHERE c.secret = @secret',
            parameters: [{ name: '@secret', value: secret }],
        })
        .fetchAll()).resources;
    if (teamQuery.length !== 1) {
        error(401);
    }

    return json(teamFilter(teamQuery[0]));
}