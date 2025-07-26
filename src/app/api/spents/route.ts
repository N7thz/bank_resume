import { NextRequest, NextResponse } from "next/server"
import {
    FormRegisterSpentProps as CreateSpentRequest
} from "@/schemas/form-register-spend-schema"
import { prisma } from "@/lib/prisma"

export async function GET() {

    const spents = await prisma.spent.findMany()

    return NextResponse.json(spents)
}

export async function POST(request: NextRequest) {

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
        data: spent
    })

    return NextResponse.json(
        spentCreated,
        { status: 201 }
    )
}
