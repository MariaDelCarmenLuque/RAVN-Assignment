import { Role } from "@prisma/client"
import { Exclude, Expose } from "class-transformer"
import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from "class-validator"
import { BaseDto } from "../../base.dto"

@Exclude()
export class UpdateUserDto extends BaseDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly firstName: string

  @Expose()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly lastName: string

  @Expose()
  @IsEmail()
  @IsOptional()
  readonly email: string

  @Expose()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly imageUrl: string

  @Expose()
  @IsNotEmpty()
  readonly role: Role
}