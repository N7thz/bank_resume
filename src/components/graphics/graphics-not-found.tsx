import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export const GraphicsNotFound = () => {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>
                    <Skeleton className="w-1/4" />
                </CardTitle>
                <CardAction>
                    <Button disabled variant={"ghost"}>
                        Alterar estilo do grafico
                    </Button>
                </CardAction>
            </CardHeader>
            <CardContent className="h-[500px]">
                <Skeleton className="size-full" />
            </CardContent>
        </Card>
    )
}
