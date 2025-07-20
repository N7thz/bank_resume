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
import { FormRegisterSpentProps } from "./forms/form-register-spent"

export const DatePicker = () => {

	const [open, setOpen] = useState(false)

	const { setValue, watch } = useFormContext<FormRegisterSpentProps>()

	const date = watch("date")

	return (
		<div className="flex flex-col gap-3 w-full">
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						id="date"
						className="w-full justify-between font-normal"
					>
						{date ? date.toLocaleDateString() : "Selecione a data"}
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
