import { Balance } from "@/@types"
import api from "."

export async function dashboard() {
    return (await api.get<Balance[]>("/dashboard")).data
}