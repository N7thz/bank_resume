"use client"

import { useForm } from "react-hook-form"
import { DatePicker } from "@/components/date-picker"
import { SelectCategory } from "@/components/select-category"
import { InputAmount } from "@/components/input-amount"
import { SelectPayMode } from "@/components/select-pay-mode"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/forms/form-root"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { 
	FormRegisterSpentProps, formRegisterSpentSchema 
} from "@/schemas/form-register-spend-schema"

export const FormRegisterSpent = () => {
	const form = useForm<FormRegisterSpentProps>({
		resolver: zodResolver(formRegisterSpentSchema),
	})

	const { register, handleSubmit, formState: { errors } } = form

	function onSubmit(data: FormRegisterSpentProps) {
		console.log(data, "sucess")
		alert("sucess")
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
					className="max-h-42"
				/>
			</Label>
			<Button
				type="submit"
				className="w-full"
			>
				Confirmar
			</Button>
		</Form>
	)
}
