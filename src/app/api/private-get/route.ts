import { DB_KEY } from '@/app/consts';
import { DbInfo, Team } from '@/app/types';
import { kv } from '@vercel/kv';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const t = request.headers.get("token") ?? "";
    console.log("Process token", t);
    const res = await fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${t}`);
    const resData = await res.json();
    if (resData.email !== "mt_xing@live.com") {
        return NextResponse.json(
            {fail: "fail"},
            {status: 403},
        );
    }

    const db = await kv.get<DbInfo>(DB_KEY);
    return NextResponse.json(
    db ?? {challenges: [], teams: []},
    {
        status: 200,
    },
    );
}