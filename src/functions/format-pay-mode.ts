import { PayMode } from "@prisma/client"
import { payModes } from "@/utils/pay-mode"

export function formatPayMode(payMode: PayMode) {
    return payModes.find((item) => item.value === payMode)!
}