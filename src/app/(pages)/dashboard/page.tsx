import { DashboardClient } from "@/components/dashboard-client"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Bank Resume | Dashboard"
}

export default function Dashboard() {
    return (
        <DashboardClient />
    )
}