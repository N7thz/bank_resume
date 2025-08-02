import { queryClient } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import {
    Popover, PopoverContent, PopoverTrigger
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { formatAmount } from "@/functions/format-amount"
import { formatCategories } from "@/functions/format-category"
import { formatPayMode } from "@/functions/format-pay-mode"
import { deleteSpent } from "@/http/spents"
import { cn } from "@/lib/utils"
import { Spent } from "@prisma/client"
import { useMutation } from "@tanstack/react-query"
import { format as formatDate } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Check, Ellipsis, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"

export const BalanceMonthCardItemDialog = ({ id }:
    { id: string }
) => {

    const [open, setOpen] = useState(false)

    async function onClose() {
        await queryClient.invalidateQueries({
            queryKey: ["find-spents"]
        })
        setOpen(false)
    }

    const { isPending, mutate } = useMutation({
        mutationKey: ["delete-spent"],
        mutationFn: () => deleteSpent(id),
        onSuccess: () => toast(
            "Sucesso",
            {
                icon: <Check className="size-4 text-primary" />,
                style: {
                    border: "1px solid oklch(51.1% 0.262 276.966)",
                },
                onAutoClose: onClose,
                description: "Gasto excluido com sucesso!",
                duration: 2000
            }
        ),
        onError: () => toast(
            "Error",
            {
                icon: <X className="size-4 text-primary" />,
                style: {
                    border: "1px solid oklch(51.1% 0.262 276.966)",
                },
                description: "Erro ao excluir gasto!",
                duration: 2000
            }
        )
    })

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger asChild>
                <Button
                    variant={"ghost"}
                    className="w-full"
                >
                    Excluir Gasto
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Tem certeza que deseja excluir o gasto?
                    </DialogTitle>
                    <DialogDescription>
                        Essa ação não pode ser desfeita...
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        variant={"secondary"}
                        onClick={() => mutate()}
                        disabled={isPending}
                    >
                        Confirmar
                    </Button>
                    <DialogClose asChild>
                        <Button
                            variant={"destructive"}
                            disabled={isPending}
                        >
                            Cancelar
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
