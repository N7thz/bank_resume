import { prisma } from "@/lib/prisma"
import { Spent } from "@prisma/client"
import { StatusCodes, getReasonPhrase } from "http-status-codes"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
    _: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params

    const spent = await prisma.spent.findUnique({
        where: {
            id
        }
    })

    const statusCodesNotFound = StatusCodes.NOT_FOUND

    if (!spent) {
        return NextResponse.json(
            {
                message: "Não foi possivel encontrar o gasto",
                status: statusCodesNotFound,
                statusText: getReasonPhrase(statusCodesNotFound)
            },
            {
                status: statusCodesNotFound,
                statusText: getReasonPhrase(statusCodesNotFound)
            }
        )
    }

    return NextResponse.json<Spent>(spent)
}

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