import { getBalance } from "@/api-routes/balances/get-balance"
import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
    return getBalance(request)
}