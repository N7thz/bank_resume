import { prisma } from "@/lib/prisma"
import {
    FormRegisterSpentProps as CreateSpentRequest
} from "@/schemas/form-register-spend-schema"
import { StatusCodes } from "http-status-codes"
import { NextRequest, NextResponse } from "next/server"

export async function createSpent(request: NextRequest) {

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
        { status: StatusCodes.CREATED }
    )
}