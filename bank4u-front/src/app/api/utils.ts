import {NextResponse} from "next/server";

export const errorResponse = (status: number, error: string) => {
    return NextResponse.json({error}, {status})
}