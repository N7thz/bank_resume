import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ChevronDownIcon } from "lucide-react"

export const Loading = () => {
    return (
        <div className="size-full space-y-4">
            <Button
                variant="outline"
                className="w-full justify-between font-normal text-primary-foreground"
            >
                Selecione a data
                <ChevronDownIcon />
            </Button>
            <Select>
                <SelectTrigger className="w-full capitalize">
                    <SelectValue placeholder="Categoria do gasto" />
                </SelectTrigger>
            </Select>
            <Select>
                <SelectTrigger className="w-full capitalize">
                    <SelectValue placeholder="Formas de pagamento" />
                </SelectTrigger>
            </Select>
            <div className="*:not-first:mt-2">
                <Label>Valor gasto</Label>
                <div className="relative">
                    <Input
                        readOnly
                        type="number"
                        defaultValue={0.00}
                        className="peer ps-6 pe-12"
                    />
                    <span className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm peer-disabled:opacity-50">
                        $
                    </span>
                    <span className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm peer-disabled:opacity-50">
                        BRL
                    </span>
                </div>
            </div>
            <div className="flex items-center gap-2 w-full">
                <Checkbox
                    className="size-4.5"
                    checked={false}
                />
                <Label className="text-base">
                    Gasto recorrente
                </Label>
            </div>
            <Label className="flex flex-col items-start">
                Descrição
                <Textarea
                    readOnly
                    placeholder="Descrição do motivo da compra"
                    className="max-h-42 mt-2"
                />
            </Label>
            <Button
                type="submit"
                className="w-full"
                disabled
            >
                Confirmar
            </Button>
        </div >
    )
}
