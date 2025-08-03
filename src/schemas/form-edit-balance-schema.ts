import z from "zod"

export type FormEditBalanceProps = z.infer<typeof formEditBalance>

export const formEditBalance = z.object({
    balance: z
        .string()
        .min(1, "Valor inválido.")
        .transform(Number)
})