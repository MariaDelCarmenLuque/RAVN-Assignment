/*
  Warnings:

  - The values [LIKE,DISLIKE] on the enum `TypeItem` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TypeItem_new" AS ENUM ('POST', 'COMMENT');
ALTER TABLE "likes" ALTER COLUMN "itemType" TYPE "TypeItem_new" USING ("itemType"::text::"TypeItem_new");
ALTER TYPE "TypeItem" RENAME TO "TypeItem_old";
ALTER TYPE "TypeItem_new" RENAME TO "TypeItem";
DROP TYPE "TypeItem_old";
COMMIT;
