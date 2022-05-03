import { Comment, Post } from "@prisma/client";
import { plainToClass, plainToInstance } from "class-transformer";
import { CreateCommentDto } from "../dtos/comments/request/create-comment.dto";
import { UpdateCommentDto } from "../dtos/comments/request/update-comment.dto";
import { CommentDto } from "../dtos/comments/response/comment.dto";
import { prisma } from "../prisma";

export class CommentsService {
    static async find(idPost:number): Promise<Comment[]> {
       const comments = await prisma.comment.findMany(
           {
               where: {
                   postId: idPost
               },
               orderBy: {
                   createdAt: 'asc'
               },
           })
        return plainToInstance(CommentDto, comments)
    }
    static async create(input: CreateCommentDto, id: number):Promise<Comment> {
        let	{postId, ...rest} = input
        const newComment = (await prisma.comment.create({data:{postId:id, ...rest}} ))
        return plainToClass(CommentDto, newComment)
        
    }

    static async update(id:number, input:UpdateCommentDto):Promise<Comment>{
        const comment = await prisma.comment.update({
            data: input,
            where: {
                id,
            },
        }) 
        return plainToClass(CommentDto,comment)
    }

    static async delete(id:number){
        const deleteComment = await prisma.comment.update({
            where: {
                id,
            },
            data: {
                deletedAt: new Date(),
            }
        }) 
        return plainToClass(CommentDto,deleteComment)
    }
}