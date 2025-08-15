import { DashboardClientProps } from "@/components/dashboard-client"
import { Pagination } from "@/components/pagination"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

export const GraphicNotLentgh = ({ data }: DashboardClientProps) => {
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
            <CardFooter className="flex-col gap-4">
                <Button
                    asChild
                    variant={"secondary"}
                    className="w-full"
                >
                    <Link href={"/home"}>
                        Voltar a Home
                    </Link>
                </Button>
                <Separator />
                <Pagination data={data} />
            </CardFooter>
        </Card>
    )
}
