import type { PageServerLoad } from './$types';
import { CosmosClient } from '@azure/cosmos';
import { DB_URL, READ_KEY } from '$env/static/private';

const client = new CosmosClient({
    endpoint: DB_URL,
    key: READ_KEY
});

export const load: PageServerLoad = async () => {
	const res = await client.database("transit-trek").container("challenges").items.readAll().fetchAll();
	return {
        challenges: res.resources.map(c => ({
            title: c.title,
            desc: c.desc,
            type: c.type,
            id: c.id,
        }))
    };
};