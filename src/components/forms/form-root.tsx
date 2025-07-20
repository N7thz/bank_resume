import { ComponentProps } from "react"
import { FormProvider } from "react-hook-form"

type FormRootProps =
	ComponentProps<typeof FormProvider<any>> & ComponentProps<"form">

export const Form = ({
	onSubmit, children, className, ...props
}: FormRootProps) => {
	return (
		<FormProvider {...props}>
			<form
				onSubmit={onSubmit}
				className={className}
			>
				{children}
			</form>
		</FormProvider>
	)
}
