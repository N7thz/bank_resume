import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { formatAmount } from "@/functions/format-amount"
import { formatCategories } from "@/functions/format-category"
import { formatPayMode } from "@/functions/format-pay-mode"
import { cn } from "@/lib/utils"
import { Spent } from "@prisma/client"
import { format as formatDate } from "date-fns"
import { ptBR } from "date-fns/locale"
import { BalanceMonthCardItemPopover } from "./balance-month-card-item-popover"

export const BalanceMonthCardItem = ({ spent }: { spent: Spent }) => {

    const amount = formatAmount(spent.amount)
    const date = formatDate(spent.date, "PPP", { locale: ptBR })
    const category = formatCategories(spent.category)
    const payMode = formatPayMode(spent.payMode)

    const infos = [category, payMode]

    return (
        <Card className="size-full border-border">
            <CardHeader>
                <CardTitle className="text-lg">
                    {amount}
                </CardTitle>
                <CardDescription>
                    {date} as
                    <span className="ml-2">
                        {spent.time}
                    </span>
                </CardDescription>
                <CardAction>
                    <BalanceMonthCardItemPopover spent={spent} />
                </CardAction>
            </CardHeader>
            <CardContent className={cn(
                "size-full grid grid-cols-2 gap-2",
                "max-md:grid-cols-1"
            )}>
                {
                    infos.map(({ Icon, text, value }) => (
                        <div
                            key={value}
                            className="flex items-center justify-center gap-2 border border-primary rounded-md p-2 capitalize"
                        >
                            {text}
                            <Icon className="size-5 text-indigo-400" />
                        </div>
                    ))
                }
            </CardContent>
            {
                spent.description &&
                <CardFooter className="border border-primary p-4 mx-6 rounded-lg">
                    <span className="text-muted-foreground mr-2">
                        Obs:
                    </span>
                    {spent.description}
                </CardFooter>
            }
        </Card>
    )
}