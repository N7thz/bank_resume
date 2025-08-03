import { prisma } from "@/lib/prisma"
import { StatusCodes, getReasonPhrase } from "http-status-codes"
import { NextRequest, NextResponse } from "next/server"
import z from "zod"

const months = Array.from({ length: 12 }, (_, i) => i)

const findBalanceSchema = z.object({
    month: z
        .string()
        .transform(Number)
        .refine(month => months.includes(month), {
            error: "Mes invalido"
        }),
    year: z
        .string()
        .length(4, "Ano invalido")
        .transform(Number)
        .refine(year => year <= new Date().getFullYear(), {
            error: "Ano invalido"
        })
})

export async function getBalance(request: NextRequest) {
    
    const searchParams = request.nextUrl.searchParams

    const month = searchParams.get("month")
    const year = searchParams.get("year")

    const { error, data } = findBalanceSchema.safeParse({ month, year })

    if (error)
        return NextResponse.json({
            ...error,
            status: StatusCodes.BAD_REQUEST,
            statusText: getReasonPhrase(StatusCodes.BAD_REQUEST)
        }, {
            status: StatusCodes.BAD_REQUEST,
            statusText: getReasonPhrase(StatusCodes.BAD_REQUEST)
        })

    const period = `${data.month}-${data.year}`

    const balance = await prisma.balance.findUnique({
        where: {
            period
        },
        include: {
            spent: true
        }
    })

    if (!balance) {

        const balance = await prisma.balance.create({
            data: {
                period,
                balance: 0,
            },
            include: {
                spent: true
            }
        })

        return NextResponse.json(balance)
    }

    return NextResponse.json(balance)
}