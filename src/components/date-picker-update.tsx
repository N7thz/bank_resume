import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { FormRegisterSpentProps } from "@/schemas/form-register-spend-schema"
import { format, isDate } from "date-fns"
import { ptBR } from "date-fns/locale"
import { ChevronDownIcon, Clock } from "lucide-react"
import { useEffect, useState } from "react"
import { useFormContext } from "react-hook-form"

export const DatePickerUpdate = () => {

	const [open, setOpen] = useState(false)

	const {
		setValue,
		watch,
		register,
	} = useFormContext<FormRegisterSpentProps>()

	const date = watch("date")
	const time = watch("time")

	useEffect(() => {
		if (date && time) setTimeout(() => setOpen(false), 1000)
	}, [date, time])

	return (
		<div className="flex flex-col gap-3 w-full">
			<Popover
				open={open}
				onOpenChange={setOpen}
			>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						className="w-full justify-between font-normal text-primary-foreground">
						{
							date
								? format(date, "P", { locale: ptBR })
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
						locale={ptBR}
						onSelect={(date) => {
							isDate(date)
								? setValue("date", date)
								: setValue("date", new Date())
						}}
					/>
					<div className="relative grow p-1">
						<Input
							type="time"
							className={cn(
								"border-1 peer appearance-none ps-9 [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none",
							)}
							{...register("time")}
						/>
						<div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
							<Clock size={16} aria-hidden="true" />
						</div>
					</div>
				</PopoverContent>
			</Popover>
		</div>
	)
}
