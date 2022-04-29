
import { IsBoolean,IsString, MaxLength } from "class-validator";
import { BaseDto } from "../../base.dto";

export class UpdateCommentDto extends BaseDto{
    
    @IsBoolean()
    readonly isDraft: boolean

    @IsString()
    @MaxLength(255)
    readonly content: string

}