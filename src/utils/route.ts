import {
    BanknoteArrowUp,
    ChartNoAxesCombined,
    LayoutDashboard
} from "lucide-react"

export type Routes = "/create-spent" | "update-spent" | "/home" | "/dashboard"

export const routes = [
    {
        href: "/create-spent",
        text: "Registrar gastos",
        Icon: BanknoteArrowUp
    },
    {
        href: "/home",
        text: "Home",
        Icon: ChartNoAxesCombined
    },
    {
        href: "/dashboard",
        text: "Dashboard",
        Icon: LayoutDashboard
    },
] as const