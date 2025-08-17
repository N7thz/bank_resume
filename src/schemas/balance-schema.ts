import z from "zod"

const WeekOfMonthEnum = z.enum([
    "PRIMEIRA",
    "SEGUNDA",
    "TERCEIRA",
    "QUARTA",
    "QUINTA"
])

const categoryEnum = z.enum([
    "FOOD",
    "TRANSPORT",
    "ENTERTAINMENT",
    "BILLS",
    "SHOPPING",
    "HEALTH",
    "EDUCATION",
    "OTHER"
])

const payModeEnum = z.enum([
    "CASH",
    "CREDIT_CARD",
    "DEBIT_CARD",
    "PIX",
    "BANK_TRANSFER",
    "OTHER"
])

const getWeekOfMonth = (date: Date): z.infer<typeof WeekOfMonthEnum> => {
    const day = date.getDate()
    if (day <= 7) return "PRIMEIRA"
    if (day <= 14) return "SEGUNDA"
    if (day <= 21) return "TERCEIRA"
    if (day <= 28) return "QUARTA"
    return "QUINTA"
}

const spentSchema = z.object({
    id: z.uuid(),
    time: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
        message: "Formato de hora inválido (use HH:mm)"
    }),
    date: z.coerce.date(),
    description: z.string().nullable(),
    amount: z.number().positive(),
    recurringExpense: z.boolean(),
    category: categoryEnum,
    payMode: payModeEnum,
    balanceId: z.uuid().nullable()
})

export const balanceWithSpentsSchema = z.object({
    id: z.uuid(),
    period: z.string().regex(/^(0[1-9]|1[0-2])-\d{4}$/, {
        message: "Período deve estar no formato MM-YYYY"
    }),
    balance: z.number(),
    updatedAt: z.coerce.date(),
    spent: z.array(spentSchema)
})