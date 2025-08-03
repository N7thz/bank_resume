import { queryClient } from "@/components/theme-provider"
import { toast } from "@/components/toast"
import { Button } from "@/components/ui/button"
import {
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { updateBalance } from "@/http/balances"
import { queryKeys } from "@/lib/query-keys"
import {
    formEditBalance,
    FormEditBalanceProps
} from "@/schemas/form-edit-balance-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { Dispatch, SetStateAction } from "react"
import { useForm } from "react-hook-form"
import { EditBalanceType } from "../dialog-edit-balance"
import { EditBalanceInput } from "../edit-value-input"
import { Form } from "./form-root"

type FormEditBalance = EditBalanceType & {
    setOpen: Dispatch<SetStateAction<boolean>>
}

export const FormEditBalance = ({
    id, balance, setOpen
}: FormEditBalance) => {

    const form = useForm({
        resolver: zodResolver(formEditBalance)
    })

    const { handleSubmit } = form

    const { isPending, isSuccess, mutate } = useMutation({
        mutationKey: queryKeys.updateBalanceValue(),
        mutationFn: (balance: number) => updateBalance(id, balance),
        onSuccess: () => toast({
            title: "Sucesso",
            description: "Gasto registrado com sucesso!",
            onAutoClose: async () => {
                await queryClient.invalidateQueries({
                    queryKey: queryKeys.findBalance()
                })
                setOpen(false)
            }
        }),
        onError: () => toast({
            title: "Error",
            description: "Erro ao registrar gasto!"
        })
    })

    function onSubmit({ balance }: FormEditBalanceProps) {
        mutate(balance)
    }

    return (
        <Form
            {...form}
            onSubmit={handleSubmit(onSubmit)}
            className="size-full"
        >
            <DialogHeader>
                <DialogTitle>
                    Editar valores recebidos
                </DialogTitle>
                <DialogDescription>
                    Aumente ou abaixe valor em conta
                </DialogDescription>
            </DialogHeader>
            <EditBalanceInput
                minValue={0}
                maxValue={3000}
                step={50}
                defaultValue={balance}
                className="pt-6"
            />
            <DialogFooter className="pt-4">
                <Button
                    type="submit"
                    className="w-full"
                    disabled={isPending || isSuccess}
                >
                    Confirmar
                </Button>
            </DialogFooter>
        </Form >
    )
}
