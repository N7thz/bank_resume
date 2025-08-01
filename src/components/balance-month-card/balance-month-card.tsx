import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { Spent } from "@prisma/client"
import { ComponentProps } from "react"
import { BalanceMonthCardItem } from "./balance-month-card-item"

type BalanceMonthCardProps = ComponentProps<typeof Card> & {
    spents: Spent[]
}

export const BalanceMonthCard = ({
    spents, className, ...props
}: BalanceMonthCardProps) => {
    return (
        <Card
            {...props}
            className={cn("w-2/3 border-border", className)}
        >
            <CardHeader>
                <CardTitle>
                    Gastos do mês
                </CardTitle>
            </CardHeader>
            <ScrollArea className={cn("max-h-[500px]", "max-md:max-h-[300px]")}>
                <CardContent className="size-full space-y-2">
                    {
                        spents.map(spent => (
                            <BalanceMonthCardItem
                                key={spent.id}
                                spent={spent}
                            />
                        ))
                    }
                </CardContent>
            </ScrollArea>
        </Card>
    )
}