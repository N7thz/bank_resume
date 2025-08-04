import { PayMode } from "@prisma/client"
import {
    BanknoteArrowUp,
    CreditCard,
    Landmark,
    LucideIcon
} from "lucide-react"

type PayModeProps = {
    value: PayMode
    text: string
    Icon: LucideIcon
}

export const payModes: PayModeProps[] = [
    {
        value: "CARD",
        text: "cartão de débito",
        Icon: CreditCard
    },
    {
        value: "PIX",
        text: "pix",
        Icon: Landmark
    },
    {
        value: "OTHER",
        text: "outros",
        Icon: BanknoteArrowUp
    },
] as const