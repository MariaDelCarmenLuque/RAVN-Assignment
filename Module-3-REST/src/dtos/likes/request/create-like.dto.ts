import { Exclude, Expose } from "class-transformer";
import { IsBoolean, IsEnum, isEnum, IsNumber} from "class-validator";
import { TypeItem } from "../../../utils/enums";
import { BaseDto } from "../../base.dto";


export class CreateLikeDto extends BaseDto{


    @Exclude()
    readonly  itemType: TypeItem

    @IsBoolean()
    readonly isLike: boolean

}