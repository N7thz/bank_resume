import { Spent } from "@prisma/client"

export type Balance = {
    id: string
    balance: number
    updatedAt: Date
    period: string
    _count: {
        spent: number
    }
    spent: Spent[]
}

export type YearMonthProps = {
    year: number
    month: number
}