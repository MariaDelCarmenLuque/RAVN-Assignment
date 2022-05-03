
import { Unauthorized, NotFound, Forbidden } from 'http-errors'
import faker from "@faker-js/faker"
import 'jest-extended/all'

import { plainToClass } from "class-transformer"
import { LoginDto } from "../dtos/auths/request/login.dto"
import { clearDatabase, prisma } from "../prisma"
import { TokenFactory } from "../utils/factories/auth.factory"
import { UserFactory } from "../utils/factories/user.factory"
import { AuthService } from "./auth.service"
import jwt,{ JsonWebTokenError } from 'jsonwebtoken'
import { User } from '@prisma/client'
import { Authenticated } from '../utils/types'


describe('AuthService', () => {
  let userFactory: UserFactory
  let tokenFactory: TokenFactory

  beforeAll(() => {
    userFactory = new UserFactory(prisma)
    tokenFactory = new TokenFactory(prisma)
  })

  beforeEach(async () => {
    jest.clearAllMocks()
  })

  afterAll(async () => {
    await clearDatabase()
    await prisma.$disconnect()
  })

  describe('login', () => {
    let userPassword: string
    let userEmail: string

    beforeAll(() => {
      userPassword = faker.internet.password(6)
      userEmail = faker.internet.email()
    })

    it('should throw an error if the user does not exist', async () => {
      const data = plainToClass(LoginDto, {
        email: faker.internet.email(),
        password: faker.internet.password(8),
      })

      await expect(AuthService.login(data)).rejects.toThrowError(
        new Unauthorized('Invalid credential'),
      )
    })

    it('should throw an error if the user password was incorrect', async () => {
      await userFactory.make({ password: userPassword, email: userEmail })

      const data = plainToClass(LoginDto, {
        email: userEmail,
        password: faker.internet.password(6),
      })

      await expect(AuthService.login(data)).rejects.toThrowError(
        new Unauthorized('Invalid credentials'),
      )
    })

    it('should create the token for the user', async () => {
      const data = plainToClass(LoginDto, {
        email: userEmail,
        password: userPassword,
      })

      const result = await AuthService.login(data)

      expect(result).toHaveProperty('accessToken')
    })
  })

  describe('createToken', () => {
    it('should throw an error if the user does not exist', async () => {
      await expect(
        AuthService.createToken(faker.datatype.number()),
      ).rejects.toThrowError(new NotFound('User not found'))
    })

    it('should create the token', async () => {
      const user = await userFactory.make()
      const result = await AuthService.createToken(user.id)

      expect(result).toHaveProperty('userId', user.id)
    })
  })

  describe('logout', () => {
    it('should return if the token was not provided', async () => {
      const result = await AuthService.logout()

      expect(result).toBeUndefined()
    })

    it('should throw an error if the token was invalid', async () => {
      const spyConsole = jest
        .spyOn(console, 'error')
        .mockImplementation(jest.fn())

      await AuthService.logout(faker.lorem.word())

      expect(spyConsole).toBeCalledWith(new JsonWebTokenError('jwt malformed'))
    })

    it('should delete the token', async () => {
      const token = await tokenFactory.make({
        user: {connect: {id: (await userFactory.make()).id}},
      expiredAt:''})
      jest
        .spyOn(jwt, 'verify')
        .mockImplementation(jest.fn(() => ({ sub: token.jti })))

      const result = await AuthService.logout(faker.lorem.word())

      expect(result).toBeUndefined()
    })
  })

  describe('generateAccessToken', () => {
    it('should generate a token', async () => {
      jest.spyOn(jwt, 'sign').mockImplementation(jest.fn(() => '123.123.123'))

      const result = AuthService.generateAccessToken(faker.lorem.word())

      expect(result).toHaveProperty('accessToken', '123.123.123')
    })
  })

  describe('validateUser', () => {
    let user: User

    beforeAll(async () => {
      user = await userFactory.make()
    })

    it('should accept if the user was an user', () => {
      const data: Authenticated<User> = { user: { ...user, type: 'USER' } }
console.log(user,data)
      expect(AuthService.validateUser(data)).toBeUndefined()
    })

    it("should throw an error if the user wasn't exists", async () => {
      const data: Authenticated<User> = {
        user: { ...user, type: 'ADMIN' },
      }
      expect(() => AuthService.validateUser(data)).toThrowError(
        new Forbidden('The current user does not have the enough privileges'),
      )
    })
  })
  describe('validateAdmin', () => {
    let admin: User

    beforeAll(async () => {
      // admin = await userFactory.make({role:'ADMIN'})
    })

    it('should accept if the user was an admin', () => {
      const data: Authenticated<User> = { user: { ...admin, type: 'ADMIN' } }
      // const admin =  userFactory.make({role: 'USER'})
      expect(AuthService.validateAdmin(data)).toBeUndefined()
    })

    it("should throw an error if the user wasn't an admin", async () => {
      const data: Authenticated<User> = { user: { ...admin, type: 'USER' } }
console.log(data)
      expect(() => AuthService.validateAdmin(data)).toThrowError(
        new Forbidden('The current user does not have the enough privileges'),
      )
    })
  })
})
