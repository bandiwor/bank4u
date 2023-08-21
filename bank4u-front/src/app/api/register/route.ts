import { NextResponse } from 'next/server';
import { UserAuthRequestBody } from '@/app/api/types';

export async function POST(req: Request) {
    const body = await req.json() as UserAuthRequestBody;

    const response = await fetch('http://localhost:8080/auth/register', {
        body: JSON.stringify(body),
        mode: 'cors',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    const apiData = await response.json();

    return NextResponse.json({
        ...apiData
    }, {
        status: apiData.statusCode ?? 200
    })
}