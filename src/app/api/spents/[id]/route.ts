import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function DELETE(
    _: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params

    await prisma.spent.delete({
        where: {
            id
        }
    })

    return NextResponse.json({ message: "" }, { status: 200 })
}