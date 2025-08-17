import { hash } from "@/lib/hash"
import { prisma } from "@/lib/prisma"
import { formPasswordSchema } from "@/schemas/form-sign-in-schema"
import { getReasonPhrase, StatusCodes } from "http-status-codes"
import { NextRequest, NextResponse } from "next/server"
import { formatError } from "zod"

export async function POST(request: NextRequest) {

    const formData = await request.json()

    const { error, data } = formPasswordSchema.safeParse(formData)

    if (error) {
        return NextResponse.json({
            ...formatError(error),
            status: StatusCodes.BAD_REQUEST,
            statusText: getReasonPhrase(StatusCodes.BAD_REQUEST)
        }, {
            status: StatusCodes.BAD_REQUEST,
            statusText: getReasonPhrase(StatusCodes.BAD_REQUEST)
        })
    }

    const password = hash(data.password)

    const { email } = data

    const [user] = await prisma.user.findMany()

    if (user) {
        return NextResponse.json({
            error:"Você já possui um usuário cadastrado",
            status: StatusCodes.CONFLICT,
            statusText: getReasonPhrase(StatusCodes.CONFLICT)
        }, {
            status: StatusCodes.CONFLICT,
            statusText: getReasonPhrase(StatusCodes.CONFLICT)
        })
    }

    const { id } = await prisma.user.create({
        data: {
            email,
            password
        }
    })

    return NextResponse.json({
        id,
        email
    }, {
        status: StatusCodes.CREATED,
        statusText: getReasonPhrase(StatusCodes.CREATED)
    })
}