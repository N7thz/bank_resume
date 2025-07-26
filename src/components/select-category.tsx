import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { CarFront, Clapperboard, Hamburger, Plus, Receipt } from "lucide-react"
import { useFormContext } from "react-hook-form"
import { cn } from "@/lib/utils"
import { FormRegisterSpentProps } from "@/schemas/form-register-spend-schema"
import { Category } from "@prisma/client"

export const SelectCategory = () => {

	const {
		setValue,
		watch,
		formState: { errors }
	} = useFormContext<FormRegisterSpentProps>()

	const category = watch("category")

	return (
		<Select onValueChange={
			(category) => setValue("category", category as Category)
		}>
			<SelectTrigger className={cn(
				"w-full",
				(errors.category && category === undefined) &&
				"border border-destructive rounded-lg data-[placeholder]:text-destructive",
				category !== undefined && "border border-sucess rounded-lg"
			)}>
				<SelectValue placeholder={
					errors.category
						? errors.category.message
						: "Categoria do gasto"
				} />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectItem value="FOOD">
						Alimentação
						<Hamburger className="text-primary size-4" />
					</SelectItem>
					<SelectItem value="TRANSPORT">
						Transporte
						<CarFront className="text-primary size-4" />
					</SelectItem>
					<SelectItem value="ENTERTAINMENT">
						Entreterimento
						<Clapperboard className="text-primary size-4" />
					</SelectItem>
					<SelectItem value="BILLS">
						Contas
						<Receipt className="text-primary size-4" />
					</SelectItem>
					<SelectItem value="OTHER">
						Outros
						<Plus className="text-primary size-4" />
					</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	)
}