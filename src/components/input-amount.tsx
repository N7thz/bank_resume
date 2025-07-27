import { useId } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFormContext } from "react-hook-form"
import { cn } from "@/lib/utils"
import { FormRegisterSpentProps } from "@/schemas/form-register-spend-schema"

export const InputAmount = () => {

	const {
		register,
		watch,
		formState: { errors }
	} = useFormContext<FormRegisterSpentProps>()

	const amount = watch("amount")

	const id = useId()

	return (
		<div className="*:not-first:mt-2">
			<Label htmlFor={id}>Valor gasto</Label>
			<div className={cn(
				"relative",
				(errors.amount && amount == undefined)
					? "border border-destructive rounded-lg"
					: Number(amount) > 0 && "border border-sucess rounded-lg"
			)}>
				<Input
					id={id}
					type="number"
					step={"0.01"}
					className={cn(
						"peer ps-6 pe-12",
						errors.amount && "placeholder:text-destructive"
					)}
					placeholder={errors.amount ? errors.amount.message : "0.00"}
					{...register("amount")}
				/>
				<span className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm peer-disabled:opacity-50">
					$
				</span>
				<span className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm peer-disabled:opacity-50">
					BRL
				</span>
			</div>
		</div>
	)
}
