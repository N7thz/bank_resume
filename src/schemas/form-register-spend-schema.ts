import { z } from "zod"

export type FormRegisterSpentProps = z.infer<typeof formRegisterSpentSchema>

export const formRegisterSpentSchema = z.object({
    date: z.date({
        error: issue => issue.input === undefined ? "A data é obrigatória" : "Invalid date"
    }),
    category: z
        .enum(
            ["FOOD", "TRANSPORT", "ENTERTAINMENT", "BILLS", "OTHER"],
            {
                error: "Selecione uma categoria"
            }
        ),
    description: z
        .string()
        .optional(),
    amount: z
        .string()
        .min(1, "O valor é obrigatório")
        .refine(
            (val) => {
                const num = Number(val)
                return !isNaN(num) && num > 0
            },
            {
                message: "O valor precisa ser um número positivo",
            },
        ),
    payMode: z.enum(
        ["PIX", "CARD", "OTHER"],
        {
            error: "Selecione uma forma de pagamento"
        }
    ),
})