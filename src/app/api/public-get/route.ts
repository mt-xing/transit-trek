import { DB_KEY } from '@/app/consts';
import { DbInfo } from '@/app/types';
import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

export async function GET() {

    const db = await kv.get<DbInfo>(DB_KEY);
    const info = db?.teams?.map(x => ({id: x.id, name: x.name, score: x.score})).sort((a, b) => b.score - a.score);
    return NextResponse.json(
    {
        teams: info ?? []
    },
    {
        status: 200,
    },
    );
}