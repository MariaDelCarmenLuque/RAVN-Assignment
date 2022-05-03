import faker from "@faker-js/faker"
import { Like, Prisma, PrismaClient, TypeItem } from "@prisma/client"
import { AbstractFactory } from "./abstract.factory"

type LikeInput = Partial<Prisma.LikeCreateInput>

export class LikeFactory extends AbstractFactory<Like> {
    constructor(protected readonly prismaClient: PrismaClient) {
        super()
      }
async make(input: LikeInput ={}): Promise<Like>{
    return this.prismaClient.like.create({
        data: {
            ...input,
            itemId:input.itemId??faker.datatype.number(),
            itemType: input.itemType ?? 'POST',
            isLike: input.isLike ?? faker.datatype.boolean(),
            
        },
     })
}

async makeMany(factorial: number, input: LikeInput = {}): Promise<Like[]> {
    return Promise.all([...Array(factorial)].map(() => this.make(input)))
  }
}