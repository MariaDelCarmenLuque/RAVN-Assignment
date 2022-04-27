import { Prisma, User } from "@prisma/client";
import createError from "http-errors";
import { CreateUserDto } from "../dtos/users/request/create-user.dto";
import { UpdateUserDto } from "../dtos/users/request/update-user.dto";
import { prisma } from "../prisma";

export class UsersService {
    static async find(): Promise<User[]> {
        return prisma.user.findMany(
            {
                orderBy: {createdAt: 'desc'}
            })
    }

    static async findOne(id:number) {
            return prisma.user.findUnique({where: {id}})
    }
    
    static async create(input: CreateUserDto):Promise<User> {
        if (await prisma.user.count({ where: {email: input.email}})){
            throw new createError.UnprocessableEntity('Email already taken')
        }

        return prisma.user.create({ data: input})
    }

    static async update(id:number, input:UpdateUserDto): Promise<User> {
        try {
            const user = await prisma.user.update({
                data: input,
                where: {
                    id,
                },
            }) 
            return user
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError){
                if (error.code === 'P2002') {
                    throw new createError.UnprocessableEntity('Email already taken')
                }
            }
        throw error
        }
    }

    static async delete(id:number){

    }

   
 }