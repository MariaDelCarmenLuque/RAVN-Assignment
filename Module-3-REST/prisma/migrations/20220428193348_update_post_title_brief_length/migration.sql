/*
  Warnings:

  - You are about to alter the column `title` on the `posts` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(100)`.
  - Added the required column `brief` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "accounts" ALTER COLUMN "deleted_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "comments" ALTER COLUMN "deleted_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "brief" VARCHAR(255) NOT NULL,
ALTER COLUMN "title" SET DATA TYPE VARCHAR(100);
