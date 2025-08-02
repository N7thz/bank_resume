import api from "@/http"
import { FormRegisterSpentProps } from "@/schemas/form-register-spend-schema"
import { FormUpdateSpentProps } from "@/schemas/form-update-spend-schema"
import { Spent } from "@prisma/client"

type GetSpentsProps = {
    year?: number
    month?: number
}

export function createSpent(data: FormRegisterSpentProps, balanceId: string) {
    return api.post<Spent>(`/spents?balanceId=${balanceId}`, data)
}

export async function getSpents({
    year = new Date().getFullYear(),
    month = new Date().getMonth()
}: GetSpentsProps) {

    const url = `/spents?year=${year}&month=${month}`

    const response = await api.get<Spent[]>(url)

    return response.data
}

export async function getSpentsById(id: string) {
    return (await api.get<Spent>(`/spents/${id}`)).data
}

export async function deleteSpent(id: string) {
    return await api.delete(`/spents/${id}`)
}

export async function updateSpent({ id, data }: {
    id: string
    data: FormUpdateSpentProps,
}) {
    return await api.put(`/spents/${id}`, data)
}