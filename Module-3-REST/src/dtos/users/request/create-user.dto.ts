import { Role } from "@prisma/client"
import { Exclude, Expose } from "class-transformer"
import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from "class-validator"
import { BaseDto } from "../../base.dto"


export class CreateUserDto extends BaseDto {

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly firstName: string


  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly lastName: string


  @IsEmail()
  readonly email: string


  @IsString()
  @Length(8, 20)
  readonly password: string

  

}