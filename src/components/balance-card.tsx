import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { ComponentProps } from "react"

export const BalanceCard = ({
    className, ...props
}: ComponentProps<typeof Card>) => {
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
            <CardContent>
                <div className="space-y-2.5">
                    <Progress value={30} />
                    <span className="text-sm">
                        R$300,00 de R$1800,00
                    </span>
                </div>
            </CardContent>
        </Card>
    )
}
