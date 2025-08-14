import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { Spent } from "@prisma/client"
import { parseISO, formatDate } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useMemo } from "react"
import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    XAxis,
    YAxis
} from "recharts"

const chartConfig = {
    amount: {
        label: "Valor Gasto",
    },
} satisfies ChartConfig

export function GraphicColumns({ spents }: { spents: Spent[] }) {

    const processedData = useMemo(() => {

        const dailyMap = new Map<string, { amount: number, count: number }>()

        spents.forEach(spent => {

            const date = parseISO(spent.date.toString())
            const dayKey = formatDate(date, 'dd/MM', { locale: ptBR })

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

                const [dayA, monthA] = a.day.split('/')
                const [dayB, monthB] = b.day.split('/')
                const dateA = new Date(new Date().getFullYear(), parseInt(monthA) - 1, parseInt(dayA))
                const dateB = new Date(new Date().getFullYear(), parseInt(monthB) - 1, parseInt(dayB))
                return dateA.getTime() - dateB.getTime()
            })
    }, [spents])

    return (
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
    )
}