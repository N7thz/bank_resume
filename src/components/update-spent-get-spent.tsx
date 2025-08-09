"use client"

import { FormUpdateSpent } from "@/components/forms/form-update-spent"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { getSpentsById } from "@/http/spents"
import { queryKeys } from "@/lib/query-keys"
import { useQuery } from "@tanstack/react-query"
import { ChevronDownIcon } from "lucide-react"
import { Loading } from "./loadings/update-spent-loading"

export const UpdateSpentGetSpent = ({ id }: { id: string }) => {

	const { data: spent, isLoading } = useQuery({
		queryKey: queryKeys.findSpentById(id),
		queryFn: async () => getSpentsById(id)
	})

	if (isLoading || !spent) {
		return <Loading />
	}

	return (
		<FormUpdateSpent spent={spent} />
	)
}
