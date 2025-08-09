import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { Ellipsis, Loader2 } from "lucide-react"

export const Loading = () => {
    return (
        <Card className="size-full rounded-md">
            <CardHeader>
                <CardTitle className="text-2xl">
                    Bank Resume
                </CardTitle>
                <CardDescription>
                    Resumo dos gastos feitos no mês
                </CardDescription>
            </CardHeader>
            <CardContent className={cn("flex gap-4", "max-md:flex-col")}>
                <Card className="w-1/3 border-border flex-1 text-muted-foreground">
                    <CardHeader>
                        <CardTitle className="text-accent-foreground">
                            Saldo
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 h-full">
                        <div className="space-y-2.5">
                            <Progress value={10} />
                        </div>
                        <Separator />
                        <div className="text-base flex items-center gap-1">
                            <Loader2 className="text-border size-4 animate-spin" />
                            <span className="mr-2">
                                0%
                            </span>
                            do valor foi gasto.
                        </div>
                        <Separator />
                        <div>
                            R$ 0,00
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button
                            disabled
                            className="w-full"
                        >
                            Editar valores recebidos
                        </Button>
                    </CardFooter>
                </Card>
                <Card className="w-2/3 border-border">
                    <CardHeader>
                        <CardTitle>
                            Gastos do mês
                        </CardTitle>
                        <CardAction>
                            <Button
                                disabled
                                className="w-full"
                            >
                                Adicionar gastos
                            </Button>
                        </CardAction>
                    </CardHeader>
                    <CardContent className="size-full space-y-2">
                        <Card className="size-full border-border">
                            <CardHeader>
                                <CardTitle className="text-lg">
                                    <Skeleton className="h-4 w-3/12 rounded-xl" />
                                </CardTitle>
                                <CardAction>
                                    <Button
                                        disabled
                                        variant={"outline"}
                                    >
                                        <Ellipsis />
                                    </Button>
                                </CardAction>
                            </CardHeader>
                            <CardContent className={cn(
                                "size-full grid grid-cols-2 gap-2",
                                "max-md:grid-cols-1"
                            )}>
                                {
                                    Array.from({ length: 2 }).map((_, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-center gap-2 border border-primary rounded-md p-2 capitalize"
                                        >
                                            <Ellipsis className="size-5 text-indigo-400" />
                                        </div>
                                    ))
                                }
                            </CardContent>
                        </Card>
                    </CardContent>
                </Card>
            </CardContent>
        </Card>
    )
}