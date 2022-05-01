import { Role } from '@prisma/client'
import { Exclude, Expose, Transform } from 'class-transformer'
import { EnumType } from 'typescript'

@Exclude()
export class UserDto {
  @Expose()
  readonly id: number

  @Expose()
  readonly firstName: string

  @Expose()
  readonly lastName: string

  @Expose()
  readonly username: string

  @Expose()
  readonly email: string

  @Expose()
  readonly isEmailPublic: boolean

  @Expose()
  readonly isFLnamePublic: boolean

  @Expose()
  readonly imageUrl: string

  @Expose()
  readonly role: Role

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  readonly createdAt: Date

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  readonly updatedAt: Date

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  readonly deletedAt: Date
}