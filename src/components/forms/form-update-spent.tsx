"use client"

import { DatePickerUpdate } from "@/components/date-picker-update"
import { Form } from "@/components/forms/form-root"
import { InputAmount } from "@/components/input-amount"
import { SelectCategory } from "@/components/select-category"
import { SelectPayMode } from "@/components/select-pay-mode"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { mergeData } from "@/functions/merge-data"
import { updateSpent } from "@/http/spents"
import { queryKeys } from "@/lib/query-keys"
import {
	FormUpdateSpentProps, formUpdateSpentSchema
} from "@/schemas/form-update-spend-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Spent } from "@prisma/client"
import { useMutation } from "@tanstack/react-query"
import { Check, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

export const FormUpdateSpent = ({ spent }: { spent: Spent }) => {

	const {
		id,
		amount,
		category,
		date,
		description,
		payMode,
		time,
	} = spent

	const form = useForm<FormUpdateSpentProps>({
		resolver: zodResolver(formUpdateSpentSchema),
		defaultValues: {
			amount,
			category,
			date: new Date(date),
			description: description ?? undefined,
			payMode,
			time
		}
	})

	const { register, handleSubmit } = form

	const { push } = useRouter()

	const { isPending, mutate } = useMutation({
		mutationKey: queryKeys.updateSpent(),
		mutationFn: async (data: Spent) => updateSpent({ id, data }),
		onSuccess: () => toast(
			"Sucesso",
			{
				icon: <Check className="size-4 text-primary" />,
				style: {
					border: "1px solid oklch(51.1% 0.262 276.966)",
				},
				onAutoClose: () => push("/"),
				description: "Gasto atualizado com sucesso!",
				duration: 2000
			}
		),
		onError: () => toast(
			"Error",
			{
				icon: <X className="size-4 text-primary" />,
				style: {
					border: "1px solid oklch(51.1% 0.262 276.966)",
				},
				description: "Erro ao registrar gasto!",
				duration: 2000
			}
		)
	})

	function onSubmit({ amount, description, ...data }: FormUpdateSpentProps) {

		const newSpent = {
			...data,
			description: (description !== "") ? description : null,
			amount: Number(amount)
		}

		const spentMerged = mergeData<Spent>({
			newData: newSpent,
			oldData: spent
		})

		mutate(spentMerged)
	}

	return (
		<Form
			{...form}
			onSubmit={handleSubmit(onSubmit)}
			className="size-full space-y-4"
		>
			<DatePickerUpdate />
			<SelectCategory
				className="border-border"
				defaultValue={category}
			/>
			<SelectPayMode
				className="border-border"
				defaultValue={payMode}
			/>
			<InputAmount className="border-border" />
			<Label className="flex flex-col items-start">
				Descrição
				<Textarea
					{...register("description")}
					placeholder="Descrição do motivo da compra"
					className="max-h-42 mt-2"
				/>
			</Label>
			<Button
				type="submit"
				className="w-full"
				disabled={isPending || isSuccess}
			>
				Confirmar
			</Button>
		</Form >
	)
}
