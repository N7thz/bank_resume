import { YearMonthProps } from "@/@types"

export function getMonthRange({ month, year }: YearMonthProps) {

    const startDate = new Date(year, month, 1)

    const endDate = new Date(year, month + 1, 0, 23, 59, 59)

    return { startDate, endDate }
}
