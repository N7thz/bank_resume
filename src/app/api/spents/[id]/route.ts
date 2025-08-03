import { deleteSpent } from "@/api-routes/spents/delete-spent"
import { updateSpent } from "@/api-routes/spents/update-spent"
import { NextRequest } from "next/server"

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    return updateSpent(request, params)
}

export async function DELETE(_: NextRequest, {
    params
}: { params: Promise<{ id: string }> }) {
    return deleteSpent(params)
}