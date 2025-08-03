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
import { Check, X } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { EditBalanceInput } from "../edit-value-input"
import { Form } from "./form-root"
import { EditBalanceType } from "../dialog-edit-balance"
import { Dispatch, SetStateAction } from "react"
import { queryClient } from "@/components/theme-provider"

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
        onSuccess: () => toast(
            "Sucesso",
            {
                icon: <Check className="size-4 text-primary" />,
                style: {
                    border: "1px solid oklch(51.1% 0.262 276.966)",
                },
                onAutoClose: async () => {
                    await queryClient.invalidateQueries({
                        queryKey: queryKeys.findBalance()
                    })
                    setOpen(false)
                },
                description: "Gasto registrado com sucesso!",
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
                description: "Erro ao registrar gasto!",
                duration: 2000
            }
        )
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
