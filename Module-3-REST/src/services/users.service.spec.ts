import { UnprocessableEntity, NotFound } from 'http-errors'
import faker from "@faker-js/faker"
import { User } from "@prisma/client"
import { plainToClass } from "class-transformer"
import { CreateUserDto } from "../dtos/users/request/create-user.dto"
import { clearDatabase, prisma } from "../prisma"
import { UserFactory } from "../utils/factories/user.factory"
import { UsersService } from "./users.service"
import { AuthService } from './auth.service'
import { UpdateUserDto } from '../dtos/users/request/update-user.dto'


jest.spyOn(console, 'error').mockImplementation(jest.fn())

describe('UserService', () => {
  let userFactory: UserFactory
  let users: User[]

  beforeAll(() => {
    userFactory = new UserFactory(prisma)
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterAll(async () => {
    await clearDatabase()
    await prisma.$disconnect()
  })

  describe('find', () => {
    beforeAll(async () => {
      users = await userFactory.makeMany(5)
    })

    it('should return all the created users', async () => {
      const result = await UsersService.find()

      expect(result.length).toBe(users.length)
    })
  })

  describe('register', () => {
    it('should throw an error if the user already exists', async () => {
      const email = faker.internet.email()
      await userFactory.make({ email })
      const data = plainToClass(CreateUserDto, {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email,
        password: faker.internet.password(6),
      })

      await expect(UsersService.create(data)).rejects.toThrowError(
        new UnprocessableEntity('email already taken.'),
      )
    })

    it('should create a new user', async () => {
      const spyCreateToken = jest.spyOn(AuthService, 'createToken')
      const generateAccessToken = jest.spyOn(AuthService, 'generateAccessToken')
      const data = plainToClass(CreateUserDto, {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(6),
      })

      const result = await UsersService.create(data)

      expect(spyCreateToken).toHaveBeenCalledTimes(1)
      expect(generateAccessToken).toHaveBeenCalledTimes(1)
      expect(result).toHaveProperty('accessToken', expect.any(String))
      expect(result).toHaveProperty('exp', expect.any(Number))
    })
  })

  describe('findOne', () => {
    let user: User

    beforeAll(async () => {
      user = await userFactory.make()
    })

    it('should throw an error if the user does not exist', async () => {
      await expect(
        UsersService.findOne(faker.datatype.number()),
      ).resolves.toBeNull()
    })

    it('should return the user', async () => {
      const result = await UsersService.findOne(user.id)

      expect(result).toHaveProperty('id', user.id)
    })
  })

  describe('update', () => {
    beforeAll(() => {
      jest.mock('jsonwebtoken', () => ({
        sign: jest.fn().mockImplementation(() => 'my.jwt.token'),
      }))
    })

    it('should throw an error if the user does not exist', async () => {
      const data = plainToClass(UpdateUserDto, {})

      await expect(
        UsersService.update(faker.datatype.number(), data),
      ).rejects.toThrowError(new NotFound('User not found'))
    })

    it('should throw an error if the user tries to update the email with an existing one', async () => {
      const existingEmail = faker.internet.email()
      const [user] = await Promise.all([
        userFactory.make(),
        userFactory.make({ email: existingEmail }),
      ])

      const data = plainToClass(UpdateUserDto, { email: existingEmail })

      await expect(UsersService.update(user.id, data)).rejects.toThrowError(
        new UnprocessableEntity('email already taken'),
      )
    })

    it('should update the user', async () => {
      const user = await userFactory.make()
      const firstName = faker.name.firstName()
      const data = plainToClass(UpdateUserDto, { firstName })

      const result = await UsersService.update(user.id, data)

      expect(result).toHaveProperty('firstName', firstName)
    })
  })

  
  describe('delete', () => {
    let admin: User

    beforeAll(async () => {
      admin = await userFactory.make()
    })

    it('should throw an error if the user does not exist', async () => {
      await expect(
        UsersService.delete(faker.datatype.number()),
      ).rejects.toThrowError()
    })

    it('should delete the user', async () => {
      const result = await UsersService.delete(admin.id)

      expect(result).toHaveProperty('email', admin.email)
    })
  })
})