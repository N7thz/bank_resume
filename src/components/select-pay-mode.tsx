import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { FormRegisterSpentProps } from "@/schemas/form-register-spend-schema"
import { payModes } from "@/utils/pay-mode"
import { PayMode } from "@prisma/client"
import { ComponentProps } from "react"
import { useFormContext } from "react-hook-form"

type SelectPayModeProps = ComponentProps<typeof Select> & {
	className?: string
}

export const SelectPayMode = ({ className, ...props }: SelectPayModeProps) => {

	const {
		setValue,
		watch,
		formState: { errors },
	} = useFormContext<FormRegisterSpentProps>()

	const payMode = watch("payMode")

	function onValueChange(payMode: string) {
		setValue("payMode", payMode as PayMode)
	}

	return (
		<Select
			onValueChange={onValueChange}
			{...props}
		>
			<SelectTrigger className={cn(
				"w-full capitalize",
				(errors.payMode && payMode === undefined) &&
				"border border-destructive rounded-lg data-[placeholder]:text-destructive",
				payMode !== undefined && "border border-sucess rounded-lg",
				className
			)}>
				<SelectValue placeholder={
					errors.payMode
						? errors.payMode.message
						: "Formas de pagamento"
				} />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{
						payModes.map(({ text, value, Icon }) => (
							<SelectItem
								key={value}
								value={value}
								className="capitalize"
							>
								{text}
								<Icon className="text-primary size-4" />
							</SelectItem>
						))
					}
				</SelectGroup>
			</SelectContent>
		</Select>
	)
}
