
import { Prisma, Token } from "@prisma/client";
import { hashSync } from "bcryptjs";
import { plainToClass, plainToInstance } from "class-transformer";
import {UnprocessableEntity, NotFound} from "http-errors";
import { TokenDto } from "../dtos/auths/response/token.dto";
import { CreateUserDto } from "../dtos/users/request/create-user.dto";
import { UpdateUserDto } from "../dtos/users/request/update-user.dto";
import { UserDto } from "../dtos/users/response/user.dto";
import { prisma } from "../prisma";
import { PrismaErrorEnum } from "../utils/enums";
import { AuthService } from "./auth.service";

export class UsersService {
   
    static async find(): Promise<UserDto[]> {
        const users= await prisma.user.findMany(
            {
                orderBy: {createdAt: 'desc'}
            })
        return plainToInstance(UserDto,users)
    }

    static async findOne(id:number): Promise<UserDto> {
            const user= await prisma.user.findUnique({where: {id}})
            return plainToClass(UserDto, user)
    }
    
    static async create(input: CreateUserDto):Promise<TokenDto> {
        const userFound = await prisma.user.findUnique({
            where: { email: input.email },
            select: { id: true },
            rejectOnNotFound: false,
        })
      
        if (userFound) {
            throw new UnprocessableEntity('email already taken.')
        }
        const encryptedPassword =hashSync(input.password, 10)
        const user = await prisma.user.create({
            data: {
             ...input,
              password: encryptedPassword,
             
            },
          }) 
        const token = await AuthService.createToken(user.id)
        return AuthService.generateAccessToken(token.jti)
    }

    static async update(id:number, {password, ...input }:UpdateUserDto): Promise<UserDto> {
        try {
            const user = await prisma.user.update({
                data: {
                    ...input,
                ...(password&& {password: hashSync(password,10)})},
                where: {
                    id,
                },
            }) 
            return plainToClass(UserDto,user)
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError){
                switch (error.code) {
                    case PrismaErrorEnum.NOT_FOUND:
                      throw new NotFound('User not found')
                    case PrismaErrorEnum.DUPLICATED:
                      throw new UnprocessableEntity('email already taken')
                    default:
                      throw error
                  }
            }
        throw error
        }
    }

    static async delete(id:number){
        const user = await prisma.user.delete({ where: { id } })

        return plainToClass(UserDto, user)
    }

   
 }