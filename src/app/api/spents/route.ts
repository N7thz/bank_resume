import { NextRequest, NextResponse } from "next/server"
import {
    FormRegisterSpentProps as CreateSpentRequest
} from "@/schemas/form-register-spend-schema"
import { prisma } from "@/lib/prisma"
import { getMonthRange } from "@/functions/get-month-rage"
import { validateYearMonth } from "@/functions/validate-year-month"

export async function GET(request: NextRequest) {

    const searchParams = request.nextUrl.searchParams
    const monthString = searchParams.get("month")
    const yearString = searchParams.get("year")

    if (!monthString || !yearString) {

        const spents = await prisma.spent.findMany()

        return NextResponse.json(spents)
    }

    const { month, year } = validateYearMonth({ monthString, yearString })

    const { startDate, endDate } = getMonthRange({ year, month })

    const spents = await prisma.spent.findMany({
        where: {
            date: {
                gte: startDate,
                lte: endDate,
            },
        },
    })

    return NextResponse.json(spents)
}

export async function POST(request: NextRequest) {

    const searchParams = request.nextUrl.searchParams
    
    const balanceId = searchParams.get("balanceId")

    const {
        amount,
        category,
        date,
        description,
        payMode,
        time
    }: CreateSpentRequest = await request.json()

    const spent = {
        date,
        time,
        category,
        description,
        payMode,
        amount: Number(amount),
    }

    const spentCreated = await prisma.spent.create({
        data: {
            ...spent,
            balanceId
        }
    })

    return NextResponse.json(
        spentCreated,
        { status: 201 }
    )
}
