import { getBalance } from "@/http/balances"
import { useQuery } from "@tanstack/react-query"

export function useFindBalance() {

    const year = new Date().getFullYear()
    const month = new Date().getMonth()

    const { data: balance, ...data } = useQuery({
        queryKey: ["find-balance"],
        queryFn: async () => getBalance({ year, month }),
    })

    return {
        balance,
        ...data
    }
}