import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { CarFront, Clapperboard, Hamburger, Plus, Receipt } from "lucide-react"

export const SelectPayMode = () => {
    return (
        <Select>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Categoria do gasto" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>
                        Categorias
                    </SelectLabel>
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
