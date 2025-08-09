import { FormSignInSchemaProps } from "@/schemas/form-sign-in-schema"
import api from "."

export async function signIn(data: FormSignInSchemaProps) {
    return (await api.post<{ token: string }>("/sign-in", data)).data
}