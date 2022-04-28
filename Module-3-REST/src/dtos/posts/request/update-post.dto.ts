import { IsBoolean, IsOptional, IsString, Max, MaxLength } from "class-validator";
import { BaseDto } from "../../base.dto";

export class UpdatePostDto extends BaseDto{
    @IsString()
    @IsOptional()
    readonly title: string
    
    @IsString()
    @IsOptional()
    readonly image: string

    @IsString()
    @IsOptional()
    readonly brief: string
    
    @IsBoolean()
    @IsOptional()
    readonly isDraft: boolean
    
    @IsString()
    @IsOptional()
    readonly content: string
}