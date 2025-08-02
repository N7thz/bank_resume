import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { formatAmount } from "@/functions/format-amount"
import { BalanceWithSpent } from "@/http/balances"
import { cn } from "@/lib/utils"
import { Check, Info, XCircle } from "lucide-react"
import { ComponentProps, useEffect, useState } from "react"
import { Separator } from "./ui/separator"

type BalanceCardProps = ComponentProps<typeof Card> & {
    balance: BalanceWithSpent
}

export const BalanceCard = ({
    balance: {
        balance,
        spent: spents
    }, className, ...props
}: BalanceCardProps) => {

    const [totalValue, setTotalValue] = useState(0)

    const amount = formatAmount(balance)

    useEffect(() => {
        const total = spents.reduce((acc, spent) => acc + spent.amount, 0)
        setTotalValue(total)
    }, [spents])

    function returnPercentage(balance: number, totalValue: number) {

        const percentage = (totalValue / balance) * 100;

        return percentage
    }

    const percentage = returnPercentage(balance, totalValue)

    return (
        <Card
            {...props}
            className={cn("w-1/3 h-full border-border flex-1", className)}
        >
            <CardHeader>
                <CardTitle>
                    Saldo
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2.5">
                    <Progress value={percentage} />
                    <span className="text-sm">
                        {formatAmount(totalValue)} de {amount}
                    </span>
                </div>
                <Separator />
                <div className="text-base flex items-center gap-1">
                    {
                        percentage < 50
                            ? <Check className="text-suces size-4" />
                            : (percentage > 50 && percentage < 80)
                                ? <Info className="text-amber-400 size-4" />
                                : <XCircle className="text-destructive size-4" />
                    }
                    <span className={cn(
                        "mr-2",
                        percentage < 50
                            ? "text-sucess"
                            : (percentage > 50 && percentage < 80)
                                ? "text-amber-400"
                                : "text-destructive"
                    )}>
                        {percentage.toFixed(2)}%
                    </span>
                    do salário foi gasto.
                </div>
            </CardContent>
        </Card >
    )
}
