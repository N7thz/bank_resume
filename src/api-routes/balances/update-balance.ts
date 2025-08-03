import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function updateBalance(
    request: NextRequest,
    params: Promise<{ id: string }>
) {

    const { balance } = await request.json() as { balance: number }
    const { id } = await params

    await prisma.balance.update({
        where: {
            id
        },
        data: {
            balance
        }
    })

    return NextResponse.json({ message: "Valores atualizados" })
}