import { DashboardClient } from "@/components/dashboard-client"
import { Card } from "@/components/ui/card"
import { Metadata } from "next"
import { redirect, RedirectType } from "next/navigation"
import z from "zod"

export const metadata: Metadata = {
    title: "Bank Resume | Dashboard"
}

const dashboardSchema = z.object({
    type: z.enum(["columns", "line"])
})

export default async function Dashboard({
    searchParams
}: {
    searchParams: Promise<{ type: "columns" | "line" | undefined }>
}) {

    const { type } = await searchParams

    const { success } = dashboardSchema.safeParse({ type })

    if (!type || !success) {
        redirect("/dashboard?type=columns", RedirectType.replace)
    }

    return <DashboardClient type={type} />
}