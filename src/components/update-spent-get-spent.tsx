"use client"

import { getSpentsById } from "@/http/spents"
import { useQuery } from "@tanstack/react-query"
import { FormUpdateSpent } from "./forms/form-update-spent"

export const UpdateSpentGetSpent = ({ id }: { id: string }) => {

	const { data: spent, isLoading } = useQuery({
		queryKey: ["update-spent", id],
		queryFn: async () => getSpentsById(id)
	})

	if (!spent || isLoading) {
		return <div>...is loading</div>
	}

	return (
		<FormUpdateSpent spent={spent} />
	)
}
