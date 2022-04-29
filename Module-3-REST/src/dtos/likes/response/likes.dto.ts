import { Exclude, Expose, Transform } from "class-transformer";
import { TypeItem } from "../../../utils/enums";

@Exclude()
export class LikeDto {
  @Expose()
  readonly id: number

  @Expose()
  readonly itemId: number

  @Expose()
  readonly  userId: number

  @Expose()
  readonly isLike: boolean

  @Expose()
  readonly itemType: TypeItem

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  readonly createdAt: Date
}