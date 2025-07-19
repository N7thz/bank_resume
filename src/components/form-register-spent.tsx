"use client"

import { useForm } from "react-hook-form"
import { DatePicker } from "./date-picker"
import { Form } from "./forms/form-root"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { SelectCategory } from "./select-category"
import { InputAmount } from "./input-amount"

const formRegisterSpentSchema = z.object({
    date: z.date(),
    category: z.enum(["FOOD", "TRANSPORT", "ENTERTAINMENT", "BILLS", "OTHER"]),
    description: z.string().min(1, "A descrição é obrigatória"),
    amount: z.number().positive("O valor deve ser positivo"),
    payMode: z.enum(["PIX", "CARD", "OTHER"]),
})

export type FormRegisterSpentProps = z.infer<typeof formRegisterSpentSchema>

export const FormRegisterSpent = () => {

    const form = useForm<FormRegisterSpentProps>({
        resolver: zodResolver(formRegisterSpentSchema)
    })

    const {
        setValue,
        register,
        handleSubmit,
        formState: { errors }
    } = form

    return (
        <Form   
            {...form}
            className="size-full space-y-4"
        >
            <DatePicker />
            <SelectCategory />
            <InputAmount />
        </Form>
    )
}