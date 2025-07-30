"use client"

import { BalanceCard } from "@/components/balance-card"
import { BalanceMonthCard } from "@/components/balance-month-card/balance-month-card"
import {
    Card, CardContent, CardDescription, CardHeader,
    CardTitle
} from "@/components/ui/card"
import { useFindSpents } from "@/hooks/use-find-spents"
import { cn } from "@/lib/utils"

export default function Home() {

    const { spents, isLoading } = useFindSpents()

    if (isLoading || !spents) {
        return <div>Loading...</div>
    }

    return (
        <Card className="size-full rounded-md">
            <CardHeader>
                <CardTitle className="text-2xl">
                    Bank Resume
                </CardTitle>
                <CardDescription>
                    Resumo dos gastos feitos no mês
                </CardDescription>
            </CardHeader>
            <CardContent className={cn("flex gap-4", "max-md:flex-col")}>
                <BalanceCard className="max-md:w-full" />
                <BalanceMonthCard
                    spents={spents}
                    className="max-md:w-full"
                />
            </CardContent>
        </Card>
    )
}
