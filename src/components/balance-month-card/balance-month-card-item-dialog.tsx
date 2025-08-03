import { queryClient } from "@/components/theme-provider"
import { toast } from "@/components/toast"
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
import { useState } from "react"

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

    const { isPending, isSuccess, mutate } = useMutation({
        mutationKey: ["delete-spent", id],
        mutationFn: () => deleteSpent(id),
        onSuccess: () => toast({
            title: "Sucesso",
            description: "Gasto excluido com sucesso!",
            onAutoClose: onClose,
        }),
        onError: () => toast({
            title: "Error",
            description: "Erro ao excluir gasto!"
        })
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
                        disabled={isPending || isSuccess}
                    >
                        Confirmar
                    </Button>
                    <DialogClose asChild>
                        <Button
                            variant={"destructive"}
                            disabled={isPending || isSuccess}
                        >
                            Cancelar
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent >
        </Dialog >
    )
}
