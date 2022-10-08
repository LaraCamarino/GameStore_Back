/*
  Warnings:

  - You are about to alter the column `price` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Decimal(9,2)` to `Integer`.
  - Added the required column `company` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "company" TEXT NOT NULL,
ALTER COLUMN "price" SET DATA TYPE INTEGER;
