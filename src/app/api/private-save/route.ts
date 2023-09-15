import { DB_KEY } from '@/app/consts';
import { DbInfo } from '@/app/types';
import { kv } from '@vercel/kv';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const t = request.headers.get("token") ?? "";

    const res = await fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${t}`);
    const resData = await res.json();
    if (resData.email !== "mt_xing@live.com") {
        return NextResponse.json(
            {fail: "fail"},
            {status: 403},
        );
    }

    const data: DbInfo = await request.json();
    kv.set(DB_KEY, data);
    return NextResponse.json(
    {},
    {
        status: 200,
    },
    );
}