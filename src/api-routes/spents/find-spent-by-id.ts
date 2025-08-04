import { prisma } from "@/lib/prisma"
import { Spent } from "@prisma/client"
import { getReasonPhrase, StatusCodes } from "http-status-codes"
import { NextResponse } from "next/server"

export async function findSpentById(
    params: Promise<{ id: string }>
) {

    const { id } = await params

    const spent = await prisma.spent.findUnique({
        where: {
            id
        }
    })

    if (!spent) {
        return NextResponse.json({
            error: "Não foi possivel encontrar o gasto",
            status: StatusCodes.BAD_REQUEST,
            statusText: getReasonPhrase(StatusCodes.BAD_REQUEST)
        }, {
            status: StatusCodes.BAD_REQUEST,
            statusText: getReasonPhrase(StatusCodes.BAD_REQUEST)
        })
    }

    return NextResponse.json<Spent>(spent)
}