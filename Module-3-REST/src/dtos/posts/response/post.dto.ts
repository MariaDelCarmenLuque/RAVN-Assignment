import { Category, Comment, User } from '@prisma/client'
import { Exclude, Expose, Transform } from 'class-transformer'
import { IsDate, IsInt, IsNumber, IsString } from 'class-validator'
import { EnumType } from 'typescript'

@Exclude()
export class PostDto {
  @Expose()
  @IsNumber()
  readonly id: number

  @Expose()
  @IsString()
  readonly title: string

  @Expose()
  @IsString()
  readonly isDraft: boolean

  @Expose()
  @IsString()
  readonly image: string

  @IsString()
  readonly brief: string
  
  @Expose()
  @IsString()
  readonly content: string

  @Expose()
  readonly  authorId: number
  @Expose()
  readonly  comments: Comment[]

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  readonly createdAt: Date

  @Expose()
  @IsDate()
  @Transform(({ value }) => value?.toISOString())
  readonly updatedAt: Date

  @Expose()
  @IsDate()
  @Transform(({ value }) => value?.toISOString())
  readonly deletedAt: Date
}