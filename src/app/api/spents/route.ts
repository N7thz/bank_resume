import { createSpent } from "@/api-routes/spents/create-spent"
import { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
    return createSpent(request)
}