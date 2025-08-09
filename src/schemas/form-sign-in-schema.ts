import z from "zod"

export const formPasswordSchema = z.object({
    password: z
        .string()
        .min(6, { message: "A senha deve ter no mínimo 6 caracteres" })
        .max(32, { message: "A senha deve ter no máximo 32 caracteres" })
        .regex(/[A-Z]/, { message: "A senha deve conter pelo menos uma letra maiúscula" })
        .regex(/[a-z]/, { message: "A senha deve conter pelo menos uma letra minúscula" })
        .regex(/[0-9]/, { message: "A senha deve conter pelo menos um número" })
        .regex(/[^A-Za-z0-9]/, { message: "A senha deve conter pelo menos um caractere especial" })
        .refine((value) => !/\s/.test(value), {
            message: "A senha não pode conter espaços em branco",
        })
})

export type FormPasswordSchemaProps = z.infer<typeof formPasswordSchema>