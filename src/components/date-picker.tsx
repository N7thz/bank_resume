import { ChevronDownIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"
import { useFormContext } from "react-hook-form"
import { cn } from "@/lib/utils"
import { FormRegisterSpentProps } from "@/schemas/form-register-spend-schema"

export const DatePicker = () => {

	const [open, setOpen] = useState(false)

	const {
		setValue, watch, formState: { errors }
	} = useFormContext<FormRegisterSpentProps>()

	const date = watch("date")

	return (
		<div className={cn(
			"flex flex-col gap-3 w-full",
			errors.date && "border border-destructive rounded-lg"
		)}>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						className={cn(
							"w-full justify-between font-normal",
							errors.date && "text-destructive"
						)}
					>
						{
							date
								? date.toLocaleDateString()
								: errors.date
									? errors.date.message
									: "Selecione a data"
						}
						<ChevronDownIcon />
					</Button>
				</PopoverTrigger>
				<PopoverContent
					align="center"
					className="w-full overflow-hidden p-0"
				>
					<Calendar
						mode="single"
						selected={date}
						captionLayout="dropdown"
						onSelect={(date) => {
							date != undefined && setValue("date", date)
							setOpen(false)
						}}
					/>
				</PopoverContent>
			</Popover>
		</div>
	)
}
