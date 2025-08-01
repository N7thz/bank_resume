import { FormUpdateSpent } from "@/components/forms/form-update-spent"
import {
	FormUpdateSpentGetSpent
} from "@/components/forms/form-update-spent-get-spent"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Metadata } from "next"

export const metadata: Metadata = {
	title: "Bank Resume - Atualizar Gastos",
}

export default async function Home({
	params
}: { params: Promise<{ id: string }> }) {

	const { id } = await params

	return (
		<main className="flex-1 flex items-center justify-center">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle>Bank Resume</CardTitle>
					<CardDescription>
						Atualize os gastos já cadastrados
					</CardDescription>
				</CardHeader>
				<CardContent>
					<FormUpdateSpentGetSpent id={id} />
				</CardContent>
			</Card>
		</main>
	)
}
