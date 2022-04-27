import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { BaseDto } from "../../base.dto";

export class RegisterDto extends BaseDto {

    @IsString()
    readonly firstname: string

    @IsString()
    readonly lastname: string

    @IsString()
    readonly username: string

    @IsEmail()
    readonly email: string
  
    @IsNotEmpty()
    @IsString()
    readonly password: string
}