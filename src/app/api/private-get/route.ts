import { DB_KEY } from '@/app/consts';
import { DbInfo, Team } from '@/app/types';
import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

// TODO Auth

export async function GET() {
    const db = await kv.get<DbInfo>(DB_KEY);
    return NextResponse.json(
    db ?? {challenges: [], teams: []},
    {
        status: 200,
    },
    );
}