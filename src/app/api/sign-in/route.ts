import { formPasswordSchema } from "@/schemas/form-sign-in-schema"
import { getReasonPhrase, StatusCodes } from "http-status-codes"
import { NextRequest, NextResponse } from "next/server"
import { randomUUID } from "node:crypto"

export async function POST(request: NextRequest) {

    const data = await request.json()

    const { error, data: result } = formPasswordSchema.safeParse(data)

    if (error) return NextResponse.json<typeof error>(error)

    const password = process.env.PASSWORD

    console.log(password)

    if (result.password !== password) {
        return NextResponse.json({
            error: "Senha incorreta.",
            status: StatusCodes.BAD_REQUEST,
            statusText: getReasonPhrase(StatusCodes.BAD_REQUEST)
        }, {
            status: StatusCodes.BAD_REQUEST,
            statusText: getReasonPhrase(StatusCodes.BAD_REQUEST)
        })
    }

    NextResponse.next().cookies.set("token", randomUUID(), {
        httpOnly: true,
        maxAge: 60 * 60 * 24 // 1 dia
    })

    return NextResponse.json(null)
}