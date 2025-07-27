import { getSpents } from "@/http/use-http"
import { useQuery } from "@tanstack/react-query"

export function useFindSpents() {

    const { data: spents, ...data } = useQuery({
        queryKey: ["find-spents"],
        queryFn: async () => getSpents({}),
    })

    return {
        spents,
        ...data
    }
}