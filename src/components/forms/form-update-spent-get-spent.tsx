"use client"

import { getSpentsById } from "@/http/use-http"
import { useQuery } from "@tanstack/react-query"
import { FormUpdateSpent } from "./form-update-spent"

export const FormUpdateSpentGetSpent = ({ id }: { id: string }) => {

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
