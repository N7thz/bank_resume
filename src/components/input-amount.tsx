import { useId } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFormContext } from "react-hook-form"
import { cn } from "@/lib/utils"
import { FormRegisterSpentProps } from "@/schemas/form-register-spend-schema"

export const InputAmount = () => {

	const {
		register, formState: { errors }
	} = useFormContext<FormRegisterSpentProps>()

	const id = useId()

	return (
		<div className="*:not-first:mt-2">
			<Label htmlFor={id}>Valor gasto</Label>
			<div className={cn("relative", errors.amount && "border border-destructive rounded-lg")}>
				<Input
					id={id}
					type="number"
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
