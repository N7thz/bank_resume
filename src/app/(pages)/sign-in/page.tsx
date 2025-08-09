import {
    Card, CardHeader, CardTitle
} from "@/components/ui/card"
import { FormSignIn } from "@/components/forms/form-sign-in"

export default function signIn() {
    return (
        <Card className="w-1/3 max-md:w-sm">
            <CardHeader>
                <CardTitle>
                    Sign-in
                </CardTitle>
            </CardHeader>
            <FormSignIn />
        </Card>
    )
}