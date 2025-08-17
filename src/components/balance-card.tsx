import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { formatAmount } from "@/functions/format-amount"
import { BalanceWithSpent } from "@/http/balances"
import { cn } from "@/lib/utils"
import { CheckCircle, Info, XCircle } from "lucide-react"
import { ComponentProps, useEffect, useState } from "react"
import { DialogEditBalance } from "./dialog-edit-balance"
import Image from "next/image"

type BalanceCardProps = ComponentProps<typeof Card> & {
    balance: BalanceWithSpent
}

export const BalanceCard = ({
    balance: {
        id,
        balance,
        spent: spents
    },
    className,
    ...props
}: BalanceCardProps) => {

    const [totalValue, setTotalValue] = useState(0)

    useEffect(() => {
        const total = spents.reduce((acc, spent) => acc + spent.amount, 0)
        setTotalValue(total)
    }, [spents])

    function returnPercentage(balance: number, totalValue: number) {
        return (totalValue / balance) * 100
    }

    function remainingValue() {

        const value = balance - totalValue

        if (value > 0) {
            return `${formatAmount(value)} restante.`
        } else if (value === 0) {
            return "Sem dinheiro restante."
        }

        return `Você está devendo ${formatAmount(Math.abs(value))}.`
    }

    const percentage = returnPercentage(balance, totalValue)
    const amount = formatAmount(balance)

    return (
        <Card
            {...props}
            className={cn("w-1/3 border-border flex-1", className)}
        >
            <CardHeader>
                <CardTitle>
                    Saldo
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 h-full">
                <div className="space-y-2.5">
                    <Progress value={percentage} />
                    <span className="text-sm">
                        {formatAmount(totalValue)} de {amount}
                    </span>
                </div>
                <Separator />
                <div className="text-base flex items-center gap-1">
                    {percentage < 50
                        ? <CheckCircle className="text-sucess size-4" />
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
                    do valor foi gasto.
                </div>
                <Separator />
                <div className={cn(
                    percentage < 50
                        ? "text-sucess"
                        : (percentage > 50 && percentage < 80)
                            ? "text-amber-400"
                            : "text-destructive"
                )}>
                    {remainingValue()}
                </div>
                <div className="w-full rounded-md border-2 border-border flex items-center justify-center mx-auto overflow-hidden">
                    <Image
                        unoptimized
                        src={percentage < 50
                            ? "/money-ok.gif"
                            : (percentage > 50 && percentage < 80)
                                ? "/money-mid.gif"
                                : "/money-low.gif"
                        }
                        width={300}
                        height={300}
                        alt={"image-value-example"}
                        className="size-full"
                    />
                </div>
            </CardContent>
            <CardFooter>
                <DialogEditBalance
                    id={id}
                    balance={balance}
                />
            </CardFooter>
        </Card>
    )
}
