import { Button } from "@/components/ui/button"
import {
    Popover, PopoverContent, PopoverTrigger
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Spent } from "@prisma/client"
import { Ellipsis } from "lucide-react"
import Link from "next/link"
import { BalanceMonthCardItemDialog } from "./balance-month-card-item-dialog"

export const BalanceMonthCardItemPopover = ({
    spent: { id }
}: { spent: Spent }) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline">
                    <Ellipsis />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                align="end"
                className="space-y-2 p-2"
            >
                <Button
                    asChild
                    variant={"ghost"}
                    className="w-full"
                >
                    <Link href={`/update-spent/${id}`}>
                        Editar Gasto
                    </Link>
                </Button>
                <Separator className="bg-primary" />
                <BalanceMonthCardItemDialog id={id} />
            </PopoverContent>
        </Popover>
    )
}