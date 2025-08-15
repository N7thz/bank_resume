import { Balance, Spent } from "@prisma/client"
import api from "."
import { YearMonthProps } from "@/@types"

export type BalanceWithSpent = (Balance & {
    spent: Spent[]
})

export async function getBalance({
    year, month
}: YearMonthProps) {

    const url = `/balance?year=${year}&month=${month}`

    return (await api.get<BalanceWithSpent>(url)).data
}

export async function updateBalance(id: string, balance: number) {
    return api.put(`/balance/${id}`, { balance })
}