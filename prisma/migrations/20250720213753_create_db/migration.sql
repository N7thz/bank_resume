-- CreateEnum
CREATE TYPE "Category" AS ENUM ('FOOD', 'TRANSPORT', 'ENTERTAINMENT', 'BILLS', 'OTHER');

-- CreateEnum
CREATE TYPE "PayMode" AS ENUM ('PIX', 'CARD', 'OTHER');

-- CreateTable
CREATE TABLE "spents" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "category" "Category" NOT NULL,
    "pay_mode" "PayMode" NOT NULL,

    CONSTRAINT "spents_pkey" PRIMARY KEY ("id")
);
