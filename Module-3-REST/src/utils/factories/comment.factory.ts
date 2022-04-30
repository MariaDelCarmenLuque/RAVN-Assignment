import faker from '@faker-js/faker'
import { Comment, Prisma, PrismaClient } from "@prisma/client";
import { AbstractFactory } from "./abstract.factory";

type CommentInput = Partial<Prisma.CommentCreateInput>

export class CommentFactory extends AbstractFactory<Comment> {
    constructor(protected readonly prismaClient: PrismaClient) {
        super()
      }
async make(input: CommentInput ={}): Promise<Comment>{
    return this.prismaClient.comment.create({
        data: {
            ...input,           
            isDraft: input.isDraft ?? faker.datatype.boolean(),
            content: input.content ?? faker.lorem.paragraph(),
        },
     })
}

async makeMany(factorial: number, input: CommentInput = {}): Promise<Comment[]> {
    return Promise.all([...Array(factorial)].map(() => this.make(input)))
  }
}