// import { prisma } from '@/lib/prisma';
// import { Category, PayMode } from '@prisma/client';
// import { NextResponse } from 'next/server';
// import { randomUUID } from 'node:crypto';

// const spentsArray = [
//     {
//         id: "a8d9c728-bef5-4f7a-8c3e-2c8e2384f7fc",
//         date: new Date("2025-08-01"),
//         time: "13:45",
//         description: "Almoço no restaurante",
//         amount: 42.5,
//         recurringExpense: false,
//         category: "FOOD",
//         payMode: "CARD",
//         balanceId: "b99e8ae5-2d68-4c83-ae5c-d66617481274"
//     },
//     {
//         id: "59a29921-3bc2-4bf6-9965-bcae38aaec43",
//         date: new Date("2025-08-02"),
//         time: "08:30",
//         description: "Uber para o trabalho",
//         amount: 18.0,
//         recurringExpense: true,
//         category: "TRANSPORT",
//         payMode: "PIX",
//         balanceId: "b99e8ae5-2d68-4c83-ae5c-d66617481274"
//     },
//     {
//         id: "e592fd94-e7fa-4720-bc89-2156db1cf0a7",
//         date: new Date("2025-08-03"),
//         time: "20:15",
//         description: "Cinema com amigos",
//         amount: 35.0,
//         recurringExpense: false,
//         category: "ENTERTAINMENT",
//         payMode: "CARD",
//         balanceId: "b99e8ae5-2d68-4c83-ae5c-d66617481274"
//     }
// ]

// function getRandomCategory(): Category {

//     const modes = Object.values(Category)
//     const randomIndex = Math.floor(Math.random() * modes.length)

//     return modes[randomIndex] as Category
// }

// function getRandomPayMode(): PayMode {
//     const modes = Object.values(PayMode)
//     const randomIndex = Math.floor(Math.random() * modes.length)
//     return modes[randomIndex] as PayMode
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
//         .from({ length: 60 })
//         .map(() => ({
//             id: randomUUID(),
//             amount: Math.random() * (Math.random() * 10),
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