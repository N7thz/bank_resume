import { EmailTemplate } from "@/components/email-template"
import { balanceWithSpentsSchema } from "@/schemas/balance-schema"
import { format as formatDate } from "date-fns"
import { ptBR } from "date-fns/locale"
import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import z, { formatError } from "zod"

const year = new Date().getFullYear()

const sendEmailSchema = z.object({
    year: z
        .number()
        .max(year, "Ano inválido."),
    month: z
        .number()
        .min(0, "Mês inválido.")
        .max(11, "Mês inválido."),
    balance: balanceWithSpentsSchema
})

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {

    const requestJson = await request.json()

    const {
        data,
        error: sendEmailSchemaError,
    } = sendEmailSchema.safeParse(requestJson)

    if (sendEmailSchemaError) return NextResponse.json(
        formatError(sendEmailSchemaError),
        { status: 404 }
    )

    const { month, year, balance } = data

    const dateFormated = formatDate(
        new Date(year, month, 1),
        "MMMM 'de' yyyy",
        { locale: ptBR }
    )

    const { error, data: email } = await resend.emails.send({
        from: "Bank Resume <onboarding@resend.dev>",
        to: "nathanferreiradev@gmail.com",
        subject: `Resumos de gastos do mês ${dateFormated}`,
        react: EmailTemplate({ balance }),
    })

    if (error) return NextResponse.json({ error }, { status: 404 })

    return NextResponse.json({
        ...email,
        message: "Email enviado com sucesso."
    })
}