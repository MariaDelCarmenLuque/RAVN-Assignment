import { Like } from "@prisma/client";
import { plainToClass, plainToInstance } from "class-transformer";
import { CreateLikeDto } from "../dtos/likes/request/create-like.dto";
import { LikeDto } from "../dtos/likes/response/likes.dto";
import { prisma } from "../prisma";
import { TypeItem } from "../utils/enums";

export class LikesService {
  static async findLikesComment(idComment: number): Promise<Like[]> {
    const likes = await prisma.like.findMany({
      where: {
        itemId: idComment,
        itemType: TypeItem.COMMENT,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    return plainToInstance(LikeDto, likes);
  }

  static async findLikesPost(idPost: number): Promise<Like[]> {
    const likes = await prisma.like.findMany({
      where: {
        itemId: idPost,
        itemType: TypeItem.POST,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    return plainToInstance(LikeDto, likes);
  }
  static async updateLikeComment(
    idComment: number,
    id: number,
    input: CreateLikeDto
  ): Promise<Like> {
    const updateLike = await prisma.like.upsert({
      where: {
        id: id,
      },
      update: {
        isLike: input.isLike,
      },
      create: {
        itemId: idComment,
        isLike: input.isLike,
        itemType: TypeItem.COMMENT,
      },
    });
    return plainToClass(LikeDto, updateLike);
  }
  static async updateLikePost(
    idPost: number,
    id: number,
    input: CreateLikeDto
  ): Promise<Like> {
    const updateLike = await prisma.like.upsert({
      where: {
        id: id,
      },
      update: {
        isLike: input.isLike,
      },
      create: {
        itemId: idPost,
        isLike: input.isLike,
        itemType: TypeItem.POST,
      },
    });
    return plainToClass(LikeDto, updateLike);
  }
  static async deleteLikePost(idLike: number) {
    const deleteLike = await prisma.like.delete({
      where: {
        id: idLike,
      },
    });
  }
  static async deleteLikeComment(idLike: number) {
    const deleteLike = await prisma.like.delete({
      where: {
        id: idLike,
      },
    });
  }
}
