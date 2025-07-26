-- CreateEnum
CREATE TYPE "Bank" AS ENUM ('ITAU', 'BRADESCO', 'CAIXA', 'SANTANDER', 'BANCO_DO_BRASIL', 'INTER', 'NUBANK', 'OTHER');

-- CreateTable
CREATE TABLE "balances" (
    "id" TEXT NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "bank" "Bank" NOT NULL,

    CONSTRAINT "balances_pkey" PRIMARY KEY ("id")
);
