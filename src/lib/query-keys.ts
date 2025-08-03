export const queryKeys = {
    findSpentById: (id: string) => ["find-spent-by-id", id],
    findSpents: () => ["find-spents"],
    findBalance: () => ["find-balance"],
    createSpent: () => ["create-spent"],
    updateSpent: () => ["update-spent"],
    deleteSpent: () => ["delete-spent"],
}