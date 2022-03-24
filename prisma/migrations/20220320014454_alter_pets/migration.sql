/*
  Warnings:

  - Added the required column `uf` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "uf" TEXT NOT NULL;
