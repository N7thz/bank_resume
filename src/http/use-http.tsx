import { FormRegisterSpentProps } from "@/schemas/form-register-spend-schema"
import api from "@/http"
import { Spent } from "@prisma/client"

export function createSpent(data: FormRegisterSpentProps) {
    return api.post<Spent>("/spents", data)
}

export async function getSpents() {

    const response = await api.get<Spent[]>("/spents")

    return response.data
}