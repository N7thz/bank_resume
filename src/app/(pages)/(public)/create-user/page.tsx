import { FormCreateUser } from "@/components/forms/form-create-user"
import {
    Card, CardHeader, CardTitle
} from "@/components/ui/card"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Bank Resume | Criação de usuário"
}

export default function CreateUser() {
    return (
        <Card className="w-1/3 max-md:w-sm">
            <CardHeader>
                <CardTitle>
                    Criar conta
                </CardTitle>
            </CardHeader>
            <FormCreateUser />
        </Card>
    )
}