
import { Prisma, Token } from '@prisma/client';
import { compareSync} from 'bcryptjs';
import { Unauthorized, NotFound } from 'http-errors';
import jwt from 'jsonwebtoken';
import { LoginDto } from "../dtos/auths/request/login.dto";
import { TokenDto } from '../dtos/auths/response/token.dto';
import { prisma } from "../prisma";
import { PrismaErrorEnum } from '../utils/enums';

export class AuthService {
    static async login(input: LoginDto): Promise<TokenDto> {
        const user = await prisma.user.findUnique({
          where: { email: input.email },
          rejectOnNotFound: false,
        })
        if (!user) {
          throw new Unauthorized('Invalid credential')
        }
        const isValidPassword = compareSync(input.password, user.password)
        if (!isValidPassword) {
          throw new Unauthorized('Invalid credentials')
        }
    
        const token = await this.createToken(user.id )
    
        return this.generateAccessToken(token.jti)
    }

    static async createToken(id: number): Promise<Token> {
        try {
          const token = await prisma.token.create({
            data: {
                refreshToken:process.env.JWT_SECREET_REFRESH as string,
                userId:id,
                expiredAt: process.env.JWT_EXPIRATION_TIME as string
            },
          })
        return token
        } catch (error) {
          if (error instanceof Prisma.PrismaClientKnownRequestError) {
            switch (error.code) {
              case PrismaErrorEnum.NOT_FOUND:
                throw new NotFound('User not found')
              default:
                throw error
            }
          }
    
          throw error
        }
      }
    static generateAccessToken(sub: string): TokenDto {
        const now = new Date().getTime()
        const exp = Math.floor(
          new Date(now).setSeconds(
            parseInt(process.env.JWT_EXPIRATION_TIME || '7200', 10),
          ) / 1000,
        )
        const iat = Math.floor(now / 1000)
        const accessToken = jwt.sign(
          {
            sub,
            iat,
            exp,
          },
          process.env.JWT_SECRET_KEY as string,
        )
        const refreshToken= process.env.JWT_SECRET_REFRESH as string
        return {
          accessToken,
          exp,
          refreshToken,
        }
      }
    static async logout(a:LoginDto ) {
              
    }

}