import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {

    const balances = await prisma.balance.findMany({
        include: {
            _count: true,
            spent: true
        }
    })

    return NextResponse.json(balances)
}