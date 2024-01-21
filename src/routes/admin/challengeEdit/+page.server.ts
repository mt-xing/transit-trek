import type { PageServerLoad } from './$types';
import { CosmosClient } from '@azure/cosmos';
import { DB_URL, READ_KEY } from '$env/static/private';
import type { ChallengeDefinition } from '../../../types/challenge';

const client = new CosmosClient({
    endpoint: DB_URL,
    key: READ_KEY
});

export const load: PageServerLoad = async ({ url }) => {
    const id = url.searchParams.get('id');
    if (id) {
        const res = await client.database("transit-trek").container("challenges").item(id, id).read<ChallengeDefinition>();
        console.log(res);
        return {
            challenge: res.resource,
        };
    } else {
        return {};
    }
};