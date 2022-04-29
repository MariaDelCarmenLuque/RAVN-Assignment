-- CreateEnum
CREATE TYPE "TypeItem" AS ENUM ('LIKE', 'DISLIKE');

-- CreateTable
CREATE TABLE "likes" (
    "id" SERIAL NOT NULL,
    "itemType" "TypeItem" NOT NULL,
    "is_like" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER,

    CONSTRAINT "likes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "accounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
