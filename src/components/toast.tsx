import { CheckCircle, XCircle } from "lucide-react"
import { toast as toastPrimitive, type ExternalToast } from "sonner"

type ToastProps = ExternalToast & {
    title: string
    variant?: "sucess" | "error"
}

export const toast = ({
    title, variant = "sucess", ...props
}: ToastProps) => toastPrimitive(
    title,
    {
        icon:
            variant === "sucess"
                ? <CheckCircle className="size-4 text-sucess" />
                : <XCircle className="size-4 text-destructive" />,
        style: {
            border: "2px solid oklch(51.1% 0.262 276.966)",
        },
        ...props
    }
)