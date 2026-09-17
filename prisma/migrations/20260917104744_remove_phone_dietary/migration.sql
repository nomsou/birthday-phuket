/*
  Warnings:

  - You are about to drop the column `dietary` on the `Guest` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Guest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Guest" DROP COLUMN "dietary",
DROP COLUMN "phone";
