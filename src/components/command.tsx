"use client"

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from "@/components/ui/command"
import { BanknoteArrowDown, ChartNoAxesCombined, Hash } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export const Command = () => {

    const [open, setOpen] = useState(false)

    useEffect(() => {

        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    const routes = [
        {
            href: "/",
            text: "Home",
            Icon: ChartNoAxesCombined
        }, {
            href: "/create-spent",
            text: "Resgistrar gasto",
            Icon: BanknoteArrowDown
        }
    ] as const

    return (
        <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Pesquise uma rota..." />
            <CommandList>
                <CommandEmpty className="italic py-6 text-center text-sm">
                    Sem resultado encontrado.
                </CommandEmpty>
                <CommandGroup heading="Rotas">
                    {
                        routes.map(({ text, href }) => (
                            <CommandItem
                                asChild
                                key={text}
                            >
                                <Link
                                    href={href}
                                    className="flex items-center"
                                >
                                    {text}
                                </Link>
                            </CommandItem>
                        ))
                    }
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    )
}
