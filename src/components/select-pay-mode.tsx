import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { BanknoteArrowUp, CreditCard, Landmark } from "lucide-react"
import { useFormContext } from "react-hook-form"
import { cn } from "@/lib/utils"
import { FormRegisterSpentProps } from "@/schemas/form-register-spend-schema"

type PayMode = "OTHER" | "PIX" | "CARD"

export const SelectPayMode = () => {

	const {
		setValue, formState: { errors }
	} = useFormContext<FormRegisterSpentProps>()

	return (
		<Select
			onValueChange={(payMode) => setValue("payMode", payMode as PayMode)}
		>
			<SelectTrigger className={cn(
				"w-full", errors.payMode && "border border-destructive rounded-lg data-[placeholder]:text-destructive"
			)}>
				<SelectValue placeholder={
					errors.payMode ? errors.payMode.message : "Formas de pagamento"
				} />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectItem value="PIX">
						PIX
						<Landmark className="text-primary size-4" />
					</SelectItem>
					<SelectItem value="CARD">
						Cartão de débito
						<CreditCard className="text-primary size-4" />
					</SelectItem>
					<SelectItem value="OTHER">
						Outros
						<BanknoteArrowUp className="text-primary size-4" />
					</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	)
}
