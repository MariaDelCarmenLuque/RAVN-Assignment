
import { Exclude, Expose } from "class-transformer";
import { IsBoolean,IsNumber,IsString, MaxLength } from "class-validator";
import { BaseDto } from "../../base.dto";

@Exclude()
export class CreateCommentDto extends BaseDto{
    
    @Expose()
    @IsBoolean()
    readonly isDraft: boolean

    @Expose()
    @IsString()
    @MaxLength(255)
    readonly content: string

    @Exclude()
    readonly postId: number

}