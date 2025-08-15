import { YearMonthProps } from "@/@types"

export function useIsLastMonth({ month, year }: YearMonthProps): boolean {

    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const currentMonth = currentDate.getMonth()

    return (
        year > currentYear ||
        (year === currentYear && month >= currentMonth)
    )
}