import { prisma } from "@/lib/prisma"
import { Spent } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

export async function updateSpent(
    request: NextRequest,
    params: Promise<{ id: string }>
) {

    const { id } = await params

    const oldSpent = await request.json() as Omit<Spent, "id">

    const spentUpdated = await prisma.spent.update({
        where: {
            id
        },
        data: oldSpent
    })

    return NextResponse.json<Spent>(spentUpdated)
}