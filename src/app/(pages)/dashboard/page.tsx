import { DashboardClient } from "@/components/dashboard-client"
import { Metadata } from "next"
import { redirect, RedirectType } from "next/navigation"
import z, { formatError } from "zod"

export const metadata: Metadata = {
    title: "Bank Resume | Dashboard"
}

const dashboardSchema = z.object({
    type: z.enum(["columns", "line"]),
    year: z.string({ error: "Ano inválido" }).transform(Number),
    month: z.string({ error: "Mês inválido" }).transform(Number),
})

export default async function Dashboard({
    searchParams
}: {
    searchParams: Promise<{
        type: "columns" | "line",
        year: string,
        month: string
    }>
}) {

    const {
        success,
        data,
    } = dashboardSchema.safeParse(await searchParams)

    if (!success) {

        const year = new Date().getFullYear()
        const month = new Date().getMonth()

        const url = `/dashboard?type=columns&year=${year}&month=${month}`

        return redirect(url, RedirectType.replace)
    }

    return <DashboardClient data={data}  />
}