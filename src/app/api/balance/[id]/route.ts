import { updateBalance } from "@/api-routes/balances/update-balance"
import { NextRequest } from "next/server"

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    return updateBalance(request, params)
}