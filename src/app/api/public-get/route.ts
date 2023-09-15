import { DB_KEY } from '@/app/consts';
import { DbInfo } from '@/app/types';
import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

export async function GET() {
    const db = await kv.get<DbInfo>(DB_KEY);
    console.log(JSON.stringify(db?.teams));
    const info = db?.teams?.map(x => ({id: x.id, name: x.name, score: x.score})).sort((a, b) => b.score - a.score);
    return NextResponse.json(
        { teams: info ?? [] },
        {
            status: 200,
            headers: {
              'Cache-Control': 'public, s-maxage=1',
              'CDN-Cache-Control': 'public, s-maxage=10',
              'Vercel-CDN-Cache-Control': 'public, s-maxage=10',
            },
        },
    );
}