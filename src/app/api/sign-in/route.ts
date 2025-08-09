import { signIn } from "@/api-routes/sign-in"
import { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
    return signIn(request)
}