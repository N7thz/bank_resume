import { getSpents } from "@/http/spents"
import { queryKeys } from "@/lib/query-keys"
import { useQuery } from "@tanstack/react-query"

export function useFindSpents() {

    const { data: spents, ...data } = useQuery({
        queryKey: queryKeys.findSpents(),
        queryFn: async () => getSpents({}),
    })

    return {
        spents,
        ...data
    }
}