"use client"

import {
    Card, CardContent, CardDescription, CardHeader,
    CardTitle
} from "@/components/ui/card"
import { getSpents } from "@/http/use-http"
import { useQuery } from "@tanstack/react-query"

export default function Home() {

    const { data: spents, isLoading } = useQuery({
        queryKey: ["find-spents"],
        queryFn: async () => getSpents(),
    })

    if (isLoading || !spents) {
        return <div>Loading...</div>
    }

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
            <CardContent className="flex gap-4">
                <Card className="w-1/3 h-full">
                    <CardHeader>
                        <CardTitle>
                            Dados
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        
                    </CardContent>
                </Card>
                <Card className="w-2/3">
                    <CardHeader>
                        <CardTitle>
                            Gráficos
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                    </CardContent>
                </Card>
            </CardContent>
        </Card>
    )
}
