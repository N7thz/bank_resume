import { Header } from "@/components/header"
import { ReactNode } from "react"

export default function PrivateLayout({ children }: { children: ReactNode }) {
    return (
        <div className="size-full flex-col">
            <Header />
            <div className="h-[calc(100dvh_-_72px)] flex items-center justify-center p-6">
                {children}
            </div>
        </div>
    )
}