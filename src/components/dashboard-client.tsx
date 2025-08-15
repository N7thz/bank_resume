"use client"

import { GraphicColumns } from "@/components/graphics/graphic-columns"
import { GraphicLine } from "@/components/graphics/graphic-line"
import { GraphicNotLentgh } from "@/components/graphics/graphic-not-lentgh"
import { GraphicsNotFound } from "@/components/graphics/graphics-not-found"
import { Pagination } from "@/components/pagination"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { useFindBalance } from "@/hooks/use-find-balance"
import { cn } from "@/lib/utils"
import { formatDate } from "date-fns"
import { ptBR } from "date-fns/locale"
import Link from "next/link"

export type DashboardClientProps = {
  data: {
    type: "columns" | "line"
    year: number
    month: number
  }
}

export const DashboardClient = ({ data }: DashboardClientProps) => {

  const { month, year } = data

  const { balance } = useFindBalance({ month, year })

  if (!balance) return <GraphicsNotFound />

  if (balance.spent.length === 0) return <GraphicNotLentgh data={data} />

  const { spent: spents } = balance

  const date = balance.spent[0].date
  const type = data.type === "columns" ? "line" : "columns"
  const href = `/dashboard?type=${type}&year=${year}&month=${month}`

  return (
    <Card className={cn(type === "columns" && "size-full")}>
      <CardHeader>
        <CardTitle>
          Gastos Mensais
        </CardTitle>
        <CardDescription className="capitalize text-base">
          {formatDate(date, "MMMM - yyyy", { locale: ptBR })}
        </CardDescription>
        <CardAction>
          <Button variant={"secondary"} asChild>
            <Link href={href}>
              Alterar estilo do grafico
            </Link>
          </Button>
        </CardAction>
      </CardHeader>
      {
        type === "columns"
          ? <GraphicColumns spents={spents} />
          : <GraphicLine spents={spents} />
      }
      <CardFooter className="mt-2 text-sm text-gray-500">
        <Pagination data={data} />
      </CardFooter>
    </Card>
  )
}