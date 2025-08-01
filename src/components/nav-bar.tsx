"use client"

import { cn } from "@/lib/utils"
import { BanknoteArrowDown, ChartNoAxesCombined } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const NavBar = () => {

    const pathname = usePathname() as "/" | "/create-spent"

    const routes = [
        {
            href: "/",
            Icon: ChartNoAxesCombined
        }, {
            href: "/create-spent",
            Icon: BanknoteArrowDown
        }
    ] as const

    return (
        <nav className="flex items-center h-full">
            <ul className="flex items-center gap-2 h-full">
                {
                    routes.map(({ Icon, href }) => (
                        <li
                            key={href}
                            className={cn(
                                "size-full flex items-center px-1 transition-colors duration-200",
                                pathname === href &&
                                "size-full border-b-2 border-primary"
                            )}
                        >
                            <Link href={href}>
                                <Icon className={cn(
                                    "size-6",
                                    pathname === href && "text-indigo-400"
                                )} />
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}
