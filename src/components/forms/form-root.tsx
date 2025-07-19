import { ComponentProps } from "react"
import { FormProvider } from "react-hook-form"

type FormRootProps = ComponentProps<typeof FormProvider<any>> & {
    className?: string
}

export const Form = ({ children, className, ...props }: FormRootProps) => {
    return (
        <FormProvider {...props}>
            <form className={className}>
                {children}
            </form>
        </FormProvider>
    )
}