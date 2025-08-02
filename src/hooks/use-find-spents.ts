import { getSpents } from "@/http/spents"
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