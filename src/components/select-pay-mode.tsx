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
import { PayMode } from "@prisma/client"

export const SelectPayMode = () => {

	const {
		setValue,
		watch,
		formState: { errors },
	} = useFormContext<FormRegisterSpentProps>()

	const payMode = watch("payMode")

	return (
		<Select onValueChange={
			(payMode) => setValue("payMode", payMode as PayMode)
		}>
			<SelectTrigger className={cn(
				"w-full",
				(errors.payMode && payMode === undefined) &&
				"border border-destructive rounded-lg data-[placeholder]:text-destructive",
				payMode !== undefined && "border border-sucess rounded-lg"
			)}>
				<SelectValue placeholder={
					errors.payMode
						? errors.payMode.message
						: "Formas de pagamento"
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
