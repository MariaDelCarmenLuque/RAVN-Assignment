
import { Prisma, Role, Token, User } from '@prisma/client';
import { compareSync} from 'bcryptjs';
import { plainToClass } from 'class-transformer';
import { Unauthorized, NotFound , Forbidden} from 'http-errors';
import {verify,sign} from 'jsonwebtoken'
import { LoginDto } from "../dtos/auths/request/login.dto";
import { TokenDto } from '../dtos/auths/response/token.dto';
import { UserDto } from '../dtos/users/response/user.dto';
import { prisma } from "../prisma";
import { PrismaErrorEnum } from '../utils/enums';
import { Authenticated } from '../utils/types';

export class AuthService {
  static async login(input: LoginDto): Promise<TokenDto> {
    const user = await prisma.user.findUnique({
      where: { email: input.email },
      rejectOnNotFound: false,
    })
    if (!user) {
      throw new Unauthorized('Invalid credential')
    }
    // check password
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
              userId:id,
              expiredAt: process.env.JWT_EXPIRATION_TIME as string
          },
        })
      return token
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          switch (error.code) {
            case PrismaErrorEnum.FOREIGN_KEY_CONSTRAINT:
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
      const accessToken = sign(
        {
          sub,
          iat,
          exp,
        },
        process.env.JWT_SECRET_KEY as string,
      )
      const  refreshToken = sign(
        {
          sub,
          iat,
          exp: 86400,
        },
          process.env.JWT_SECRET_REFRESH as string)
      return {
        accessToken,
        exp,
        refreshToken
      }
    }

  static async logout(accessToken?: string): Promise<void> {
    if (!accessToken) return

    try {
      const { sub } = verify(accessToken, process.env.JWT_SECRET_KEY as string)

      await prisma.token.delete({ where: { jti: sub as string } })
    } catch (error) {
      console.error(error)
    }
  }

  static validateUser({ user }: Authenticated<User>): void {
    if (user.role !== 'USER') {
      throw new Forbidden(
        'The current user does not have the enough privileges',
      )
    }
  }

  static validateAdmin({ user }: Authenticated<User>): void {
    if (user.role !== 'ADMIN') {
      throw new Forbidden(
        'The current user does not have the enough privileges',
      )
    }
  }

}