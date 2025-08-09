import { compareSync, hashSync } from "bcrypt"

export function hash(password: string) {
    return hashSync(password, 6)
}

export function verify({
    password,
    passwordEncrypted
}: {
    password: string,
    passwordEncrypted: string
}) {
    return compareSync(password, passwordEncrypted)
}