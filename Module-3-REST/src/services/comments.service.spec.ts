import { clearDatabase, prisma } from "../prisma"
import { CommentFactory } from "../utils/factories/comment.factory"
import { CommentsService } from "./comments.service"

jest.spyOn(console, 'error').mockImplementation(jest.fn())

describe('PostService', () => {
  let commentFactory: CommentFactory
  let comments: Comment[]

  beforeAll(() => {
    commentFactory = new CommentFactory(prisma)
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterAll(async () => {
    await clearDatabase()
    await prisma.$disconnect()
  })

  describe('find', () => {
    beforeAll(async () => {
     comments= await commentFactory.makeMany(5)
    })

    it('should return all the created comments', async () => {
      const result = await CommentsService.find(request.params.idPost)
      expect(result.length).toBe(comments.length)
    })
  })

 
})