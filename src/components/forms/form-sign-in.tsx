"use client"

import { Form } from "@/components/forms/form-root"
import { InputPassWord } from "@/components/input-password"
import { toast } from "@/components/toast"
import { Button } from "@/components/ui/button"
import { CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { signIn } from "@/http/sign-in"
import { queryKeys } from "@/lib/query-keys"
import { cn } from "@/lib/utils"
import {
    FormSignInSchemaProps, formPasswordSchema
} from "@/schemas/form-sign-in-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { XCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

export const FormSignIn = () => {

    const form = useForm<FormSignInSchemaProps>({
        resolver: zodResolver(formPasswordSchema)
    })

    const {
        register,
        handleSubmit,
        formState: { errors, isValid }
    } = form

    const { push } = useRouter()

    const { mutate, isPending } = useMutation({
        mutationKey: queryKeys.signIn(),
        mutationFn: async ({
            email, password
        }: FormSignInSchemaProps) => signIn({ email, password }),
        onSuccess: () => push("/home"),
        onError: () => toast({
            title: "Senha incorreta",
            description: "A senha está incorreta."
        })
    })

    async function onSubmit(formData: FormSignInSchemaProps) {
        mutate(formData)
    }

    return (
        <Form
            {...form}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
        >
            <CardContent className="space-y-2">
                <Input
                    {...register("email")}
                    placeholder="Digite sua senha..."
                    className={cn(
                        errors.email && "not-focus-visible:border-destructive focus-visible:ring-destructive",
                        isValid && "not-focus-visible:border-sucess focus-visible:ring-sucess"
                    )}
                />
                <InputPassWord autoComplete="off" />
                {
                    errors.password &&
                    <div className="flex gap-2 items-center text-base text-destructive">
                        <XCircle className="size-4" />
                        <span className="italic font-semibold">
                            {errors.password.message}
                        </span>
                    </div>

                }
            </CardContent>
            <CardFooter>
                <Button
                    type="submit"
                    className="w-full"
                    disabled={errors.password != undefined || isPending}
                >
                    Confirmar
                </Button>
            </CardFooter>
        </Form>
    )
}
