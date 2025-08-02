import { Button } from "@/components/ui/button"
import {
    Card,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import Link from "next/link"

export const BalaceMonthNotFind = () => {
    return (
        <Card className="w-2/3 border-border">
            <CardHeader className="text-center text-muted-foreground rounded-lg">
                <CardTitle className="text-base font-normal">
                    Sem gastos neste mês ainda
                </CardTitle>
            </CardHeader>
            <CardFooter>
                <Button
                    asChild
                    className="w-full"
                >
                    <Link href={"/create-spent"}>
                        Adicionar gastos
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}