/*
  Warnings:

  - Added the required column `time` to the `spents` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "spents" ADD COLUMN     "time" TEXT NOT NULL;
