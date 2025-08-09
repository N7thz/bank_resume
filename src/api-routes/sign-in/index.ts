import { encrypt } from "@/lib/auth"
import { verify } from "@/lib/hash"
import { prisma } from "@/lib/prisma"
import { formPasswordSchema } from "@/schemas/form-sign-in-schema"
import { getReasonPhrase, StatusCodes } from "http-status-codes"
import { NextRequest, NextResponse } from "next/server"
import { cookies as Cookies } from "next/headers"
import { formatError } from "zod"

export async function signIn(request: NextRequest) {

    const cookies = await Cookies()
    const data = await request.json()

    const { error, data: result } = formPasswordSchema.safeParse(data)

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

    const { email, password } = result

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (!user) {
        return NextResponse.json({
            error: "Email ou senha inválidos",
            status: StatusCodes.BAD_REQUEST,
            statusText: getReasonPhrase(StatusCodes.BAD_REQUEST)
        }, {
            status: StatusCodes.BAD_REQUEST,
            statusText: getReasonPhrase(StatusCodes.BAD_REQUEST)
        })
    }

    const passwordIsValid = verify({
        password,
        passwordEncrypted: user.password
    })

    if (!passwordIsValid) {
        return NextResponse.json({
            error: "Email ou senha inválidos",
            status: StatusCodes.BAD_REQUEST,
            statusText: getReasonPhrase(StatusCodes.BAD_REQUEST)
        }, {
            status: StatusCodes.BAD_REQUEST,
            statusText: getReasonPhrase(StatusCodes.BAD_REQUEST)
        })
    }

    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000)
    const token = await encrypt({ sub: { email }, expires })

    cookies.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires,
        sameSite: "lax",
        path: "/",
    })

    return NextResponse.json({ token })
}