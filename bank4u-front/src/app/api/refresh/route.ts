import { UserLoginRequestBody } from '@/app/api/types';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json() as UserLoginRequestBody;

  const response = await fetch('http://localhost:8080/auth/refresh', {
    body: JSON.stringify(body),
    mode: 'cors',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const apiData = await response.json()

  return NextResponse.json({
    ...apiData
  })
}