import { NextResponse } from "next/server";
import db from "@/db/drizzle";
import { isAdmin } from "@/lib/admin";
import { challenges } from "@/db/schema";

export const GET = async () => {
    if(!isAdmin()) {
        return new NextResponse("Acesso negado", { status: 403 })
    }
    
    const data = await db.query.challenges.findMany()

    return NextResponse.json(data)
}

export const POST = async (req: Request) => {
    if(!isAdmin()) {
        return new NextResponse("Acesso negado", { status: 403 })
    }

    const body = await req.json()
    
    const data = await db.insert(challenges).values({
        ...body,
    }).returning()

    return NextResponse.json(data[0])
}