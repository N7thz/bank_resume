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
import { deleteSpent } from "@/http/use-http"
import { Spent } from "@prisma/client"
import { useMutation } from "@tanstack/react-query"
import { format as formatDate } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Check, Ellipsis, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"
import { queryClient } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

export const BalanceMonthCardItem = ({ spent }: { spent: Spent }) => {

    const [open, setOpen] = useState(false)

    const id = spent.id
    const amount = formatAmount(spent.amount)
    const date = formatDate(spent.date, "PPP", { locale: ptBR })
    const category = formatCategories(spent.category)
    const payMode = formatPayMode(spent.payMode)

    const infos = [category, payMode]

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
                onAutoClose: async () => {
                    await queryClient.invalidateQueries({
                        queryKey: ["find-spents"]
                    })
                    setOpen(false)
                },
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
        <Card className="size-full border-border">
            <CardHeader>
                <CardTitle className="text-lg">
                    {amount}
                </CardTitle>
                <CardDescription>
                    {date} as
                    <span className="ml-2">
                        {spent.time}
                    </span>
                </CardDescription>
                <CardAction>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline">
                                <Ellipsis />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent
                            align="end"
                            className="space-y-2 p-2"
                        >
                            <Button
                                asChild
                                variant={"ghost"}
                                className="w-full"
                            >
                                <Link href={`/edit-spent/${id}`}>
                                    Editar Gasto
                                </Link>
                            </Button>
                            <Separator className="bg-primary" />
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
                        </PopoverContent>
                    </Popover>
                </CardAction>
            </CardHeader>
            <CardContent className={cn(
                "size-full grid grid-cols-2 gap-2",
                "max-md:grid-cols-1"
            )}>
                {
                    infos.map(({ Icon, text, value }) => (
                        <div
                            key={value}
                            className="flex items-center justify-center gap-2 border border-primary rounded-md p-2 capitalize"
                        >
                            {text}
                            <Icon className="size-5 text-indigo-400" />
                        </div>
                    ))
                }
            </CardContent>
            {
                spent.description &&
                <CardFooter>
                    {spent.description}
                </CardFooter>
            }
        </Card>
    )
}