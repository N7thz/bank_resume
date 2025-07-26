"use client"

import { DatePicker } from "@/components/date-picker"
import { Form } from "@/components/forms/form-root"
import { InputAmount } from "@/components/input-amount"
import { SelectCategory } from "@/components/select-category"
import { SelectPayMode } from "@/components/select-pay-mode"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createSpent } from "@/http/use-http"
import {
	FormRegisterSpentProps, formRegisterSpentSchema
} from "@/schemas/form-register-spend-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { Check, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

export const FormRegisterSpent = () => {

	const form = useForm<FormRegisterSpentProps>({
		resolver: zodResolver(formRegisterSpentSchema)
	})

	const {
		register,
		handleSubmit,
	} = form

	const { push } = useRouter()

	const { isPending, mutate } = useMutation({
		mutationKey: ["create-spent"],
		mutationFn: async (data: FormRegisterSpentProps) => createSpent(data),
		onSuccess: () => toast(
			"Sucesso",
			{
				icon: <Check className="size-4 text-primary" />,
				style: {
					border: "1px solid oklch(51.1% 0.262 276.966)",
				},
				onAutoClose: () => push("/"),
				description: "Gasto registrado com sucesso!",
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

	function onSubmit(data: FormRegisterSpentProps) {
		mutate(data)
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
				disabled={isPending}
			>
				Confirmar
			</Button>
		</Form>
	)
}
