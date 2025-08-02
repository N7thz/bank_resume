-- CreateEnum
CREATE TYPE "public"."Category" AS ENUM ('FOOD', 'TRANSPORT', 'ENTERTAINMENT', 'BILLS', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."PayMode" AS ENUM ('PIX', 'CARD', 'OTHER');

-- CreateTable
CREATE TABLE "public"."balances" (
    "id" TEXT NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "period" TEXT NOT NULL,

    CONSTRAINT "balances_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."spents" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TEXT NOT NULL,
    "description" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "category" "public"."Category" NOT NULL,
    "pay_mode" "public"."PayMode" NOT NULL,
    "balanceId" TEXT,

    CONSTRAINT "spents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "balances_period_key" ON "public"."balances"("period");

-- AddForeignKey
ALTER TABLE "public"."spents" ADD CONSTRAINT "spents_balanceId_fkey" FOREIGN KEY ("balanceId") REFERENCES "public"."balances"("id") ON DELETE SET NULL ON UPDATE CASCADE;
