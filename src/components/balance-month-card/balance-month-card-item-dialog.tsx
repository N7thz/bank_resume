import { queryClient } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
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
import { deleteSpent } from "@/http/spents"
import { queryKeys } from "@/lib/query-keys"
import { useMutation } from "@tanstack/react-query"
import { Check, X } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export const BalanceMonthCardItemDialog = ({ id }:
    { id: string }
) => {

    const [open, setOpen] = useState(false)

    async function onClose() {
        await queryClient.invalidateQueries({
            queryKey: queryKeys.findSpents()
        })
        setOpen(false)
    }

    const { isPending, mutate } = useMutation({
        mutationKey: ["delete-spent", id],
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
