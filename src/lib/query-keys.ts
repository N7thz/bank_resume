export const queryKeys = {
    findSpentById: (id: string) => ["find-spent-by-id", id],
    findSpents: () => ["find-spents"],
    findBalance: ({ month, year }: {
        year?: number
        month?: number
    }) => ["find-balance", month, year],
    createSpent: () => ["create-spent"],
    updateSpent: () => ["update-spent"],
    deleteSpent: () => ["delete-spent"],
    updateBalanceValue: () => ["update-balance-value"],
    signIn: () => ["sign-in"]
}