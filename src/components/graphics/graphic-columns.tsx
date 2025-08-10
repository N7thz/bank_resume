"use client"

import { Button } from "@/components/ui/button"
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { Spent } from "@prisma/client"
import Link from "next/link"
import { useMemo } from "react"
import {
    Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis
} from "recharts"
import { format as formatDate } from "date-fns"
import { ptBR } from "date-fns/locale"

const chartConfig = {
    amount: {
        label: "Valor Gasto",
    },
} satisfies ChartConfig

export function GraphicColumns({ spents }: { spents: Spent[] }) {

    const processedData = useMemo(() => {

        const dailyMap = new Map<string, { amount: number, count: number }>()

        spents.forEach(spent => {

            const date = new Date(spent.date)
            const dayKey = date.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'short'
            })

            const dayData = dailyMap.get(dayKey) || { amount: 0, count: 0 }
            dailyMap.set(dayKey, {
                amount: dayData.amount + spent.amount,
                count: dayData.count + 1
            })
        })

        return Array
            .from(dailyMap.entries())
            .map(([day, { amount, count }]) => ({
                day,
                amount: parseFloat(amount.toFixed(2)),
                count
            }))
            .sort((a, b) => new Date(a.day).getTime() - new Date(b.day).getTime())

    }, [spents])

    const date = spents[0].date

    return (
        <Card className="size-full">
            <CardHeader>
                <CardTitle>
                    Gastos Mensais
                </CardTitle>
                <CardDescription className="capitalize text-base">
                    {formatDate(date, "MMMM - yyyy", { locale: ptBR })}
                </CardDescription>
                <CardAction>
                    <Button variant={"secondary"} asChild>
                        <Link href={"/dashboard?type=line"}>
                            Alterar estilo do grafico
                        </Link>
                    </Button>
                </CardAction>
            </CardHeader>
            <ChartContainer config={chartConfig} className="h-[500px] w-full">
                <ResponsiveContainer>
                    <BarChart data={processedData}>
                        <CartesianGrid
                            vertical={false}
                            strokeDasharray="3 3"
                            stroke="var(--muted-foreground)"
                        />
                        <XAxis
                            dataKey="day"
                            tickLine={false}
                            axisLine={false}
                            tick={{ fill: '#6b7280', fontSize: 12 }}
                            tickMargin={8}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tick={{ fill: '#6b7280', fontSize: 12 }}
                            tickFormatter={(value) => `R$ ${value}`}
                            width={80}
                        />
                        <ChartTooltip content={
                            <ChartTooltipContent
                                formatter={(value) => [`R$ ${value}`]}
                                labelFormatter={(label) => `Dia: ${label}`}
                            />
                        } />
                        <ChartLegend
                            content={
                                <ChartLegendContent
                                    payload={[{
                                        value: 'Valor Gasto',
                                        type: 'circle',
                                        color: 'var(--color-primary)'
                                    }]}
                                />
                            }
                        />
                        <Bar
                            dataKey="amount"
                            name="Valor Gasto"
                            fill="var(--color-primary)"
                            radius={[6, 6, 0, 0]}
                            maxBarSize={40}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </ChartContainer>
            <CardFooter className="mt-2 text-sm text-gray-500">
                Total de {spents.length} transações nos últimos dias
            </CardFooter>
        </Card>
    )
}