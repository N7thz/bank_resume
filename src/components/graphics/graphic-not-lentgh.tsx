import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"

export const GraphicNotLentgh = () => {
    return (
        <Card className="w-1/2">
            <CardHeader>
                <CardTitle>
                    Gastos Mensais
                </CardTitle>
            </CardHeader>
            <CardContent className="mx-auto text-2xl text-muted-foreground">
                Sem gastos neste mês
            </CardContent>
            <CardFooter>
                <Button asChild className="w-full">
                    <Link href={"/home"}>
                        Voltar a Home
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}
