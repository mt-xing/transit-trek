import { DB_KEY } from '@/app/consts';
import { DbInfo } from '@/app/types';
import { kv } from '@vercel/kv';
import { NextRequest, NextResponse } from 'next/server';

// TODO Auth

export async function POST(request: NextRequest) {
    const data: DbInfo = await request.json();
    kv.set(DB_KEY, data);
    return NextResponse.json(
    {},
    {
        status: 200,
    },
    );
}