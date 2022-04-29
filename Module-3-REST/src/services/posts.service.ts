import { Post, Prisma } from "@prisma/client";
import { plainToClass, plainToInstance } from "class-transformer";
import createError from "http-errors";
import { CreatePostDto } from "../dtos/posts/request/create-post.dto";
import { UpdatePostDto } from "../dtos/posts/request/update-post.dto";
import { PostDto } from "../dtos/posts/response/post.dto";
import { prisma } from "../prisma";

export class PostsService {
    static async find(): Promise<Post[]> {
        const posts = await  prisma.post.findMany(
            {
                orderBy: {createdAt: 'asc'},
                include: {comments:true}
            })
        return plainToInstance(PostDto,posts)
    }
    static async findOne(id:number) {
        const postFound = await prisma.post.findUnique({where: {id}, include: {comments:true}})

        return plainToClass(PostDto,postFound)
    }
    static async create(input: CreatePostDto):Promise<Post> {
        const newPost = prisma.post.create({ data: input, include:{comments:true}})
        return plainToClass(PostDto, newPost)
    }

    static async update(id:number, input:UpdatePostDto):Promise<Post>{
        const post = await prisma.post.update({
            data: input,
            where: {
                id,
            },
        }) 
        return plainToClass(PostDto,post)
    }

    static async delete(id:number){
        const deletePost = await prisma.post.update({
            where: {
                id,
            },
            data: {
                deletedAt: new Date(),
            }
        }) 

    }
}