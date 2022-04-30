import faker from '@faker-js/faker'
import { Post, Prisma, PrismaClient } from "@prisma/client";
import { AbstractFactory } from "./abstract.factory";

type PostInput = Partial<Prisma.PostCreateInput>

export class PostFactory extends AbstractFactory<Post> {
    constructor(protected readonly prismaClient: PrismaClient) {
        super()
      }
async make(input: PostInput ={}): Promise<Post>{
    return this.prismaClient.post.create({
        data: {
            ...input,
            title: input.title ?? faker.hacker.phrase(),
            image: input.image ?? faker.image.image(),
            brief: input.brief ?? faker.hacker.phrase(),
            isDraft: input.isDraft ?? faker.datatype.boolean(),
            content: input.content ?? faker.lorem.paragraph(),
        },
     })
}

async makeMany(factorial: number, input: PostInput = {}): Promise<Post[]> {
    return Promise.all([...Array(factorial)].map(() => this.make(input)))
  }
}