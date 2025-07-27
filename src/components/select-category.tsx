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
import { categories } from "@/utils/categories"
import { Category } from "@prisma/client"
import { useFormContext } from "react-hook-form"

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
					{
						categories.map(({ Icon, text, value }) => (
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