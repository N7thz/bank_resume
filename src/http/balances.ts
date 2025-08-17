import { BalanceWithSpent, YearMonthProps } from "@/@types"
import api from "."

export async function getBalance({
    year, month
}: YearMonthProps) {

    const url = `/balance?year=${year}&month=${month}`

    return (await api.get<BalanceWithSpent>(url)).data
}

export async function updateBalance(id: string, balance: number) {
    return api.put(`/balance/${id}`, { balance })
}