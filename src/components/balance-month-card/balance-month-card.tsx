import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { Spent } from "@prisma/client"
import Link from "next/link"
import { ComponentProps } from "react"
import { Button } from "../ui/button"
import { BalanceMonthCardItem } from "./balance-month-card-item"

type BalanceMonthCardProps = ComponentProps<typeof Card> & {
    spents: Spent[]
}

export const BalanceMonthCard = ({
    spents, className, ...props
}: BalanceMonthCardProps) => {

    const spentsByDate = spents
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    return (
        <Card
            {...props}
            className={cn("w-2/3 border-border", className)}
        >
            <CardHeader>
                <CardTitle>
                    Gastos do mês
                </CardTitle>
                <CardAction>
                    <Button
                        asChild
                        className="w-full"
                    >
                        <Link href={"/create-spent"}>
                            Adicionar gastos
                        </Link>
                    </Button>
                </CardAction>
            </CardHeader>
            <ScrollArea className={cn(
                "max-h-[500px]",
                "max-md:max-h-full"
            )}>
                <ScrollBar />
                <CardContent className="size-full space-y-2">
                    {
                        spentsByDate.map(spent => (
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