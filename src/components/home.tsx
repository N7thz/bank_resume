"use client"

import { BalanceCard } from "@/components/balance-card"
import {
    BalaceMonthNotFound
} from "@/components/balance-month-card/balace-month-not-find"
import {
    BalanceMonthCard
} from "@/components/balance-month-card/balance-month-card"
import { Loading } from "@/components/loadings/home-loading"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { useFindBalance } from "@/hooks/use-find-balance"
import { cn } from "@/lib/utils"

export const HomeClient = () => {

    const { balance, isLoading } = useFindBalance({})

    if (isLoading || !balance) return <Loading />

    const { spent: spents } = balance

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
            <CardContent className={cn("size-full flex gap-4", "max-md:flex-col")}>
                <BalanceCard
                    balance={balance}
                    className="max-md:w-full"
                />
                {
                    spents && spents.length > 0
                        ? <BalanceMonthCard
                            spents={spents}
                            className="max-md:w-full"
                        />
                        : <BalaceMonthNotFound />
                }
            </CardContent>
        </Card>
    )
}
