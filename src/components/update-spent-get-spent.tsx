"use client"

import { getSpentsById } from "@/http/spents"
import { useQuery } from "@tanstack/react-query"
import { FormUpdateSpent } from "./forms/form-update-spent"
import { queryKeys } from "@/lib/query-keys"

export const UpdateSpentGetSpent = ({ id }: { id: string }) => {

	const { data: spent, isLoading } = useQuery({
		queryKey: queryKeys.findSpentById(id),
		queryFn: async () => getSpentsById(id)
	})

	console.log(spent)

	if (!spent || isLoading) {
		return <div>...is loading</div>
	}

	return (
		<FormUpdateSpent spent={spent} />
	)
}
