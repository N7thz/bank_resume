type mergeDataProps<T> = {
    oldData: T
    newData: Partial<T>
}

export function mergeData<T>({ newData, oldData }: mergeDataProps<T>) {

    const result: T = {} as T

    for (const key in oldData) {

        const newValue = newData[key as keyof T]

        result[key as keyof T] = (
            newValue !== undefined ? newValue : oldData[key as keyof T]
        )
    }

    return result
}