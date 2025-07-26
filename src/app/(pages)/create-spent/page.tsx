import { FormRegisterSpent } from "@/components/forms/form-register-spent"
import { Header } from "@/components/header"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Metadata } from "next"

export const metadata: Metadata = {
	title: "Bank Resume - Registrar Gastos",
}

export default async function Home() {
	return (
		<div className="flex-1 flex flex-col">
			<Header />
			<main className="flex-1 flex items-center justify-center">
				<Card className="w-full max-w-md">
					<CardHeader>
						<CardTitle>Bank Resume</CardTitle>
						<CardDescription>
							Cadastre os gastos e veja o saldo e o total de gastos
						</CardDescription>
					</CardHeader>
					<CardContent>
						<FormRegisterSpent />
					</CardContent>
				</Card>
			</main>
		</div>
	)
}
