import { FormSignInSchemaProps } from "@/schemas/form-sign-in-schema"
import api from "."
import { User } from "@prisma/client"

export async function createuser(data: FormSignInSchemaProps) {
    return (await api.post<User>("/create-user", data)).data
}