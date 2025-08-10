"use client"

import { useFindBalance } from "@/hooks/use-find-balance"
import { GraphicColumns } from "./graphics/graphic-columns"
import { GraphicLine } from "./graphics/graphic-line"
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "./ui/card"
import { Skeleton } from "./ui/skeleton"
import { Button } from "./ui/button"
import Link from "next/link"

export const DashboardClient = ({ type }: { type: "columns" | "line" }) => {

  const { balance } = useFindBalance()

  if (!balance) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>
            <Skeleton className="w-1/4" />
          </CardTitle>
          <CardAction>
            <Button disabled variant={"ghost"}>
              Alterar estilo do grafico
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="h-[500px]">
          <Skeleton className="size-full" />
        </CardContent>
      </Card>
    )
  }

  if (balance.spent.length === 0) {
    return (
      <Card className="w-1/2">
        <CardHeader>
          <CardTitle>
            Gastos Mensais
          </CardTitle>
        </CardHeader>
        <CardContent className="mx-auto text-2xl text-muted-foreground">
          Sem gastos neste mês
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full">
            <Link href={"/home"}>
              Voltar a Home
            </Link>
          </Button>
        </CardFooter>
      </Card>
    )
  }

  if (type === "columns") {
    return (
      <GraphicColumns spents={balance.spent} />
    )
  }

  return (
    <GraphicLine spents={balance.spent} />
  )
}