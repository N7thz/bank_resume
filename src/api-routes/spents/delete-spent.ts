import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function deleteSpent(params: Promise<{ id: string }>) {

    const { id } = await params

    await prisma.spent.delete({
        where: {
            id
        }
    })

    return NextResponse.json(null)
}