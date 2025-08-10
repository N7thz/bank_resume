import { HomeClient } from "@/components/home"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Bank Resume | Home"
}

export default function Home() {
    return (
        <HomeClient />
    )
}
