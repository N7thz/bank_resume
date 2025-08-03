import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogTrigger
} from "@/components/ui/dialog"
import { FormEditBalance } from "./forms/form-edit-balance"
import { useState } from "react"

export type EditBalanceType = {
    id: string,
    balance: number
}

export const DialogEditBalance = ({ id, balance }: EditBalanceType) => {

    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="w-full">
                    Editar valores recebidos
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <FormEditBalance
                    id={id}
                    balance={balance}
                    setOpen={setOpen}
                />
            </DialogContent>
        </Dialog >
    )
}
