type MonthRange = {
    yearString: string
    monthString: string
}

export function validateYearMonth({ monthString, yearString }: MonthRange) {

    const date = new Date()

    const year = Number(yearString)
    const month = Number(monthString)

    if (year > 0 && month >= 0 && month <= 11) {
        return {
            year,
            month
        }
    }

    return {
        year: date.getFullYear(),
        month: date.getMonth()
    }
}
