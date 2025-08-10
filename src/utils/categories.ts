import { Category } from "@prisma/client"
import {
    Hamburger, CarFront, Clapperboard, Receipt, Plus, LucideIcon
} from "lucide-react"

type CategoryProps = {
    value: Category
    text: string
    Icon: LucideIcon
}

export const categories: CategoryProps[] = [
    {
        value: "FOOD",
        text: "alimentação",
        Icon: Hamburger
    },
    {
        value: "TRANSPORT",
        text: "transporte",
        Icon: CarFront
    },
    {
        value: "ENTERTAINMENT",
        text: "entretenimento",
        Icon: Clapperboard
    },
    {
        value: "BILLS",
        text: "contas",
        Icon: Receipt
    },
    {
        value: "OTHER",
        text: "outros",
        Icon: Plus
    },
] as const