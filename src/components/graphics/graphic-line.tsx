"use client"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { Spent } from "@prisma/client"
import { format as formatDate, parseISO } from "date-fns"
import { ptBR } from "date-fns/locale"
import { TrendingUp } from "lucide-react"
import Link from "next/link"
import { useMemo } from "react"
import { CartesianGrid, LabelList, Line, LineChart, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { ScrollArea } from "../ui/scroll-area"

const chartConfig = {
    amount: {
        label: "Valor Gasto",
        color: "#2563eb",
    },
} satisfies ChartConfig

export function GraphicLine({ spents }: { spents: Spent[] }) {
    // Processa os dados para agrupar por dia
    const processedData = useMemo(() => {
        const dailyMap = new Map<string, { amount: number, count: number }>()

        spents.forEach(spent => {
            const date = parseISO(spent.date.toString())
            const dayKey = formatDate(date, 'dd/MM', { locale: ptBR }) // Formato "dia/mês"

            const dayData = dailyMap.get(dayKey) || { amount: 0, count: 0 }
            dailyMap.set(dayKey, {
                amount: dayData.amount + spent.amount,
                count: dayData.count + 1
            })
        })

        return Array.from(dailyMap.entries())
            .map(([day, { amount, count }]) => ({
                day,
                amount: parseFloat(amount.toFixed(2)),
                count
            }))
            .sort((a, b) => {
                // Ordena corretamente convertendo para Date
                const [dayA, monthA] = a.day.split('/')
                const [dayB, monthB] = b.day.split('/')
                const dateA = new Date(new Date().getFullYear(), parseInt(monthA) - 1, parseInt(dayA))
                const dateB = new Date(new Date().getFullYear(), parseInt(monthB) - 1, parseInt(dayB))
                return dateA.getTime() - dateB.getTime()
            })
    }, [spents])

    const date = formatDate(parseISO(spents[0].date.toString()), "MMMM 'de' yyyy", { locale: ptBR })

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>
                    Gastos Mensais
                </CardTitle>
                <CardDescription className="text-base">
                    {formatDate(date, "MMMM 'de' yyyy", { locale: ptBR })}
                </CardDescription>
                <CardAction>
                    <Button variant={"secondary"} asChild>
                        <Link href={"/dashboard?type=columns"}>
                            Alterar estilo do gráfico
                        </Link>
                    </Button>
                </CardAction>
            </CardHeader>
            <ScrollArea className="w-full h-full">
                <CardContent className="size-full">
                    <ChartContainer className="h-[500px]" config={chartConfig}>
                        <ResponsiveContainer>
                            <LineChart
                                data={processedData}
                                margin={{ top: 20, right: 20, left: 0, bottom: 10 }}
                            >
                                <CartesianGrid
                                    vertical={false}
                                    strokeDasharray="3 3"
                                    stroke="#f3f4f6"
                                />
                                <XAxis
                                    dataKey="day"
                                    tickLine={false}
                                    axisLine={false}
                                    tick={{ fill: '#6b7280', fontSize: 12 }}
                                    tickMargin={10}
                                />
                                <YAxis
                                    tickLine={false}
                                    axisLine={false}
                                    tick={{ fill: '#6b7280', fontSize: 12 }}
                                    tickFormatter={(value) => `R$ ${value}`}
                                    width={80}
                                />
                                <ChartTooltip
                                    content={
                                        <ChartTooltipContent
                                            formatter={(value) => [`R$ ${value}`]}
                                            labelFormatter={(label) => `Dia: ${label}`}
                                        />
                                    }
                                />
                                <Line
                                    dataKey="amount"
                                    type="monotone"
                                    stroke="var(--color-primary)"
                                    strokeWidth={2}
                                    dot={{
                                        fill: "var(--color-primary)",
                                        strokeWidth: 2,
                                        r: 4
                                    }}
                                    activeDot={{
                                        r: 6,
                                        stroke: "var(--color-primary)",
                                        strokeWidth: 2,
                                        fill: "#fff"
                                    }}
                                >
                                    <LabelList
                                        dataKey="amount"
                                        position="top"
                                        formatter={(value: number) => `R$ ${value.toFixed(2)}`}
                                        style={{
                                            fill: 'var(--color-primary)',
                                            fontSize: 12,
                                            fontWeight: 500
                                        }}
                                    />
                                </Line>
                            </LineChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </CardContent>
            </ScrollArea>
        </Card>
    )
}