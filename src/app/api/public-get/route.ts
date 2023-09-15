import { DB_KEY, PUBLIC_GET_TOKEN } from '@/app/consts';
import { DbInfo } from '@/app/types';
import { kv } from '@vercel/kv';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const t = request.headers.get("token") ?? "";
    console.log("Process token", t);

    if (t !== PUBLIC_GET_TOKEN) {
        return NextResponse.json(
            {fail: "fail"},
            {status: 403},
        );
    }

    const db = await kv.get<DbInfo>(DB_KEY);
    const info = db?.teams?.map(x => ({id: x.id, name: x.name, score: x.score})).sort((a, b) => b.score - a.score);
    return NextResponse.json(
        { teams: info ?? [] },
        {
            status: 200,
        },
    );
}