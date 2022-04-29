import { Post } from '@prisma/client'
import { Exclude, Expose, Transform } from 'class-transformer'
import { IsDate, IsNumber, IsString } from 'class-validator'

@Exclude()
export class CommentDto {
  @Expose()
  @IsNumber()
  readonly id: number

  @Expose()
  @IsString()
  readonly isDraft: boolean
  
  @Expose()
  @IsString()
  readonly content: string

  @Expose()
  readonly  authorId: number

  @Expose()
  readonly  postId: number

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