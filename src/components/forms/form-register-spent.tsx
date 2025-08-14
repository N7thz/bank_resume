"use client"

import { DatePicker } from "@/components/date-picker"
import { Form } from "@/components/forms/form-root"
import { InputAmount } from "@/components/input-amount"
import { SelectCategory } from "@/components/select-category"
import { SelectPayMode } from "@/components/select-pay-mode"
import { toast } from "@/components/toast"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useFindBalance } from "@/hooks/use-find-balance"
import { createSpent } from "@/http/spents"
import { queryKeys } from "@/lib/query-keys"
import {
	FormRegisterSpentProps, formRegisterSpentSchema
} from "@/schemas/form-register-spend-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

export const FormRegisterSpent = () => {

	const { balance } = useFindBalance({})

	const form = useForm<FormRegisterSpentProps>({
		resolver: zodResolver(formRegisterSpentSchema),
		defaultValues: {
			recurringExpense: false
		}
	})

	const { register, handleSubmit, setValue } = form

	const { push } = useRouter()

	const balanceId = balance ? balance.id : ""

	const { isPending, isSuccess, mutate } = useMutation({
		mutationKey: queryKeys.createSpent(),
		mutationFn: async (data: FormRegisterSpentProps) =>
			createSpent(data, balanceId),
		onSuccess: () => toast({
			title: "Sucesso",
			description: "Gasto registrado com sucesso!",
			onAutoClose: () => push("/"),
		}),
		onError: () => toast({
			title: "Error",
			description: "Erro ao registrar gasto!",
		})
	})

	function onSubmit(formData: FormRegisterSpentProps) {
		mutate(formData)
	}

	return (
		<Form
			{...form}
			onSubmit={handleSubmit(onSubmit)}
			className="size-full space-y-4"
		>
			<DatePicker />
			<SelectCategory />
			<SelectPayMode />
			<InputAmount />
			<div className="flex items-center gap-2 w-full">
				<Checkbox
					id={"checkbox-register-spent"}
					className="size-4"
					onCheckedChange={(checked) => setValue("recurringExpense", checked === true)}
					defaultChecked={false}
				/>
				<Label
					htmlFor={"checkbox-register-spent"}
					className="text-base"
				>
					Gasto recorrente
				</Label>
			</div>
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
