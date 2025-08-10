import { dashboard } from "@/http/dashboard"
import { useQuery } from "@tanstack/react-query"

export function useFindAllBalances() {

    const { data: balances, ...data } = useQuery({
        queryKey: ["find-all-balances"],
        queryFn: () => dashboard()
    })

    return {
        balances,
        ...data
    }
}
