import api from "."

export async function signIn(password: string) {
    return (await api.post<{ message: string }>("/sign-in", { password })).data
}