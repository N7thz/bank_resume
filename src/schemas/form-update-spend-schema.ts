import { z } from "zod"

export type FormUpdateSpentProps = z.infer<typeof formUpdateSpentSchema>

export const formUpdateSpentSchema = z.object({
    date: z
        .date()
        .optional(),
    time: z
        .string()
        .length(5, "O horário deve ter o formato HH:MM")
        .optional(),
    category: z
        .enum(
            ["FOOD", "TRANSPORT", "ENTERTAINMENT", "BILLS", "OTHER"],
            { error: "Selecione uma categoria" }
        )
        .optional(),
    description: z
        .string()
        .optional(),
    amount: z
        .string()
        .or(z.number())
        .optional(),
    payMode: z
        .enum(
            ["PIX", "CARD", "OTHER"],
            { error: "Selecione uma forma de pagamento" }
        )
        .optional(),
})