import api from "@/http"
import { FormRegisterSpentProps } from "@/schemas/form-register-spend-schema"
import { Spent } from "@prisma/client"

export function createSpent(data: FormRegisterSpentProps, balanceId: string) {
    return api.post<Spent>(`/spents?balanceId=${balanceId}`, data)
}

export async function getSpentsById(id: string) {
    return (await api.get<Spent>(`/spents/${id}`)).data
}

export async function deleteSpent(id: string) {
    return await api.delete(`/spents/${id}`)
}

export async function updateSpent({ id, data }: {
    id: string
    data: Spent,
}) {
    return await api.put(`/spents/${id}`, data)
}