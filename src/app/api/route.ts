// import { prisma } from "@/lib/prisma"
// import { Category, PayMode } from "@prisma/client"
// import { NextResponse } from "next/server"
// import { randomUUID } from "node:crypto"

// function getRandomCategory() {

//     const modes = Object.values(Category)
//     const randomIndex = Math.floor(Math.random() * modes.length)

//     return modes[randomIndex]
// }

// function getRandomPayMode() {

//     const modes = Object.values(PayMode)
//     const randomIndex = Math.floor(Math.random() * modes.length)

//     return modes[randomIndex]
// }

// function getRandomDate(start: Date, end: Date): Date {
//     return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
// }

// function getRandomTime(): string {

//     const hours = Math.floor(Math.random() * 24)
//     const minutes = Math.floor(Math.random() * 60)

//     const formattedHours = hours.toString().padStart(2, "0")
//     const formattedMinutes = minutes.toString().padStart(2, "0")

//     return `${formattedHours}:${formattedMinutes}`
// }

// export async function GET() {

//     const array = Array
//         .from({ length: 30 })
//         .map(() => ({
//             id: randomUUID(),
//             amount: Math.random() * (Math.random() * 100),
//             category: getRandomCategory(),
//             date: getRandomDate(new Date("2025-08-01"), new Date("2025-08-31")),
//             payMode: getRandomPayMode(),
//             time: getRandomTime(),
//             balanceId: "b99e8ae5-2d68-4c83-ae5c-d66617481274"
//         }))

//     const spents = await prisma.spent.createMany({
//         data: array
//     })

//     return NextResponse.json(spents)
// }