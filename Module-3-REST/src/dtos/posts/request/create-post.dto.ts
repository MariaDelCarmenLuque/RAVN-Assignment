
import { IsBoolean, IsString, MaxLength } from "class-validator";
import { BaseDto } from "../../base.dto";

export class CreatePostDto extends BaseDto{

    @IsString()
    @MaxLength(100)
    readonly title: string
    
    @IsString()
    readonly image: string

    @IsString()
    @MaxLength(255)
    readonly brief: string
    
    @IsBoolean()
    readonly isDraft: boolean
    
    readonly content: string

}