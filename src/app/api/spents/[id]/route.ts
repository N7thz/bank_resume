import { deleteSpent } from "@/api-routes/spents/delete-spent"
import { findSpentById } from "@/api-routes/spents/find-spent-by-id"
import { updateSpent } from "@/api-routes/spents/update-spent"
import { NextRequest } from "next/server"

type ParamsProps = { params: Promise<{ id: string }> }

export async function GET(_: NextRequest, {
    params
}: ParamsProps) {
    return findSpentById(params)
}

export async function PUT(request: NextRequest, {
    params
}: ParamsProps) {
    return updateSpent(request, params)
}

export async function DELETE(_: NextRequest, {
    params
}: ParamsProps) {
    return deleteSpent(params)
}