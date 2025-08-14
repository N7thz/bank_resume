import { getBalance } from "@/http/balances"
import { queryKeys } from "@/lib/query-keys"
import { useQuery } from "@tanstack/react-query"

type FindBalanceProps = {
    year?: number
    month?: number
}

export function useFindBalance({
    month = new Date().getMonth(),
    year = new Date().getFullYear()
}: FindBalanceProps) {

    const { data: balance, ...data } = useQuery({
        queryKey: queryKeys.findBalance(),
        queryFn: async () => getBalance({ year, month }),
    })

    return {
        balance,
        ...data
    }
}