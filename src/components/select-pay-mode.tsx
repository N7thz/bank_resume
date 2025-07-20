import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { BanknoteArrowUp, CreditCard, Landmark } from "lucide-react"

export const SelectPayMode = () => {
	return (
		<Select>
			<SelectTrigger className="w-full">
				<SelectValue placeholder="Formas de pagamento" />
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
