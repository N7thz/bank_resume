"use client"

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
        <div className="grid grid-cols-4 gap-2">
            {
                spents.map((spent) => (
                    <div key={spent.id} className="p-4 border-b w-full max-w-md ">
                        <h2 className="text-lg font-bold">{spent.description}</h2>
                        <p>Categoria: {spent.category}</p>
                        <p>Valor: R$ {spent.amount.toFixed(2)}</p>
                        <p>Data: {new Date(spent.date).toLocaleDateString()}</p>
                        <p>Hora: {spent.time}</p>
                        <p>Modo de Pagamento: {spent.payMode}</p>
                    </div>
                ))
            }
        </div>
    )
}
