import { Balance, Spent } from "@prisma/client"
import api from "."

export type BalanceWithSpent = (Balance & {
    spent: Spent[]
})

export async function getBalance({
    year, month
}: { year: number, month: number }) {

    const url = `/balance?year=${year}&month=${month}`

    return (await api.get<BalanceWithSpent>(url)).data
}