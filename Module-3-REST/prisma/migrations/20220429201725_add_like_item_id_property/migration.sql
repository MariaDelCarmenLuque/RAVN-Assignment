/*
  Warnings:

  - Added the required column `item_id` to the `likes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "likes" ADD COLUMN "item_id" INTEGER NOT NULL;
