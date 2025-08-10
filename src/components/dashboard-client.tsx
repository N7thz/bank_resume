"use client"

import { useFindAllBalances } from "@/hooks/use-find-all-balances"
import { Card } from "./ui/card"

export const DashboardClient = () => {

  const { balances } = useFindAllBalances()

  return (
    <Card className="size-full">
      {
        JSON.stringify(balances)
      }
    </Card>
  )
}