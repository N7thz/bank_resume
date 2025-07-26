type MonthRange = {
    year: number
    month: number
}

export function getMonthRange({ month, year }: MonthRange) {

    const startDate = new Date(year, month, 1)

    const endDate = new Date(year, month + 1, 0, 23, 59, 59)

    return { startDate, endDate }
}
