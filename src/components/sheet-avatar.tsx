"use client"

import { Avatar } from "@/components/avatar"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet"
import { routes, Routes } from "@/utils/route"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

export const SheetAvatar = () => {

    const [open, setOpen] = useState(false)

    const pathname = usePathname() as Routes

    function onNavigate() {
        setTimeout(() => setOpen(false), 800)
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger>
                <Avatar className="hover:scale-90 cursor-pointer" />
            </SheetTrigger>
            <SheetContent
                side="left"
                className="bg-card border-r-primary"
            >
                <SheetHeader>
                    <SheetTitle>
                        Opções
                    </SheetTitle>
                    <SheetDescription>
                        Visualize as opções de usuário e rotas possiveis
                    </SheetDescription>
                </SheetHeader>
                <div className="space-y-4 ">
                    <Avatar className="size-46 mx-auto" />
                    <div className="space-y-2 px-2">
                        {
                            routes.map(({ Icon, href, text }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    className="flex gap-2"
                                    onNavigate={onNavigate}
                                >
                                    <Button
                                        className="w-full"
                                        variant={
                                            pathname.startsWith(href)
                                                ? "default"
                                                : "secondary"
                                        }
                                    >
                                        {text}
                                        <Icon />
                                    </Button>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </SheetContent>
        </Sheet >
    )
}
