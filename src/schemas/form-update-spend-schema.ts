import { z } from "zod"

export type FormUpdateSpentProps = z.infer<typeof formUpdateSpentSchema>

export const formUpdateSpentSchema = z.object({
    date: z
        .date({
            error: issue => issue.input === undefined ? "A data é obrigatória" : "Invalid date"
        })
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
        .unknown()
        .optional(),
    payMode: z
        .enum(
            ["PIX", "CARD", "OTHER"],
            { error: "Selecione uma forma de pagamento" }
        )
        .optional(),
})