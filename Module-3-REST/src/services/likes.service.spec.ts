import faker from "@faker-js/faker";
import { Comment, Like, Post } from "@prisma/client";
import { plainToClass } from "class-transformer";
import { CreateLikeDto } from "../dtos/likes/request/create-like.dto";
import { LikeDto } from "../dtos/likes/response/likes.dto";
import { clearDatabase, prisma } from "../prisma";
import { CommentFactory } from "../utils/factories/comment.factory";
import { LikeFactory } from "../utils/factories/like.factory";
import { PostFactory } from "../utils/factories/post.factory";
import { LikesService } from "./likes.service";

jest.spyOn(console, "error").mockImplementation(jest.fn());

describe("CommentService", () => {
  let postFactory: PostFactory;
  let commentFactory: CommentFactory;
  let likeFactory: LikeFactory;
  let likes: Like[];

  beforeAll(() => {
    commentFactory = new CommentFactory(prisma);
    postFactory = new PostFactory(prisma);
    likeFactory = new LikeFactory(prisma);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await clearDatabase();
    await prisma.$disconnect();
  });

  describe("findLikesPost", () => {
    let post: Post;
    beforeAll(async () => {
      post = await postFactory.make();
      likes = await likeFactory.makeMany(5, {
        itemId: post.id,
        itemType: "POST",
      });
    });
    it("should return all the created likes or dislike in a Post", async () => {
      const result = await LikesService.findLikesPost(post.id);
      expect(result.length).toBe(likes.length);
    });
    it("Throw an empty array if the like does not exis in a Post", async () => {
      const result = await LikesService.findLikesPost(faker.datatype.number())
      expect([]).toEqual(expect.arrayContaining(result));
    });
  });
  describe("findLikesComment", () => {
    let post: Post;
    let comment: Comment;
    beforeAll(async () => {
      post = await postFactory.make();
      comment = await commentFactory.make({
        post: {
          connect: {
            id: post.id,
          },
        },
      });
      likes = await likeFactory.makeMany(5, {
        itemId: comment.id,
        itemType: "COMMENT",
      });
    });
    it("should return all the created likes in a Comment", async () => {
      const result = await LikesService.findLikesComment(comment.id);
      expect(result.length).toBe(likes.length);
    });
    it("Throw an empty array if the like does not exis in a Commentt", async () => {
      const result = await LikesService.findLikesComment(faker.datatype.number())
      expect([]).toEqual(expect.arrayContaining(result));
    });
  });
  describe("deleteLikePost", () => {
    let post: Post;
    let like: Like;
    beforeAll(async () => {
      post = await postFactory.make();
      like = await likeFactory.make({
        itemId: post.id,
        itemType: "POST",
      });
    });
    it("should delete the likes or dislike in a Post", async () => {
      const result = await LikesService.deleteLikePost(like.id);
      expect(result).toBeUndefined();
    });
    it("Throw an error if the like does not exist in a Post", async () => {
      await expect(
        LikesService.deleteLikePost(faker.datatype.number())
      ).rejects.toThrowError();
    });
  });
  describe("deleteLikeComment", () => {
    let post: Post;
    let comment: Comment;
    let like: Like;
    beforeAll(async () => {
      post = await postFactory.make();
      comment = await commentFactory.make({
        post: {
          connect: {
            id: post.id,
          },
        },
      });
      like = await likeFactory.make({
        itemId: comment.id,
        itemType: "COMMENT",
      });
    });
    it("should delete the likes or dislike in a Comment", async () => {
      const result = await LikesService.deleteLikeComment(like.id);
      expect(result).toBeUndefined();
    });
    it("Throw an error if the like does not exis in a Commentt", async () => {
      await expect(
        LikesService.deleteLikeComment(faker.datatype.number())
      ).rejects.toThrowError();
    });
  });

  describe("updateLikeComment", () => {
    let post: Post;
    let comment: Comment;
    let like: Like;
    beforeAll(async () => {
      post = await postFactory.make();
      comment = await commentFactory.make({
        post: {
          connect: {
            id: post.id,
          },
        },
      });
      like = await likeFactory.make({
        itemId: comment.id,
        itemType: "COMMENT",
      });
    });
    it("should update the likes or dislike in a Comment", async () => {
   
      const isLike = faker.datatype.boolean()
      const data= plainToClass(CreateLikeDto,{isLike})
      const result = await LikesService.updateLikeComment(comment.id,like.id,data);
      expect(result).toHaveProperty('isLike',isLike);
    });

    it("should create a new like or dislike in a Comment when likeId does no exist", async () => {
   
      const isLike = faker.datatype.boolean()
      const data= plainToClass(CreateLikeDto,{isLike})
      const result = await LikesService.updateLikeComment(comment.id,faker.datatype.number(),data);
      expect(result).toHaveProperty('isLike',isLike);
    });

  });

  describe("updateLikePost", () => {
    let post: Post;
    let like: Like;
    beforeAll(async () => {
      post = await postFactory.make();
      like = await likeFactory.make({
        itemId: post.id,
        itemType: "POST",
      });
    });
    it("should update the likes or dislike in a Post", async () => {
   
      const isLike = faker.datatype.boolean()
      const data= plainToClass(CreateLikeDto,{isLike})
      const result = await LikesService.updateLikePost(post.id,like.id,data);
      expect(result).toHaveProperty('isLike',isLike);
    });

    it("should create a new like or dislike in a Post when likeId does no exist", async () => {
   
      const isLike = faker.datatype.boolean()
      const data= plainToClass(CreateLikeDto,{isLike})
      const result = await LikesService.updateLikePost(post.id,faker.datatype.number(),data);
      expect(result).toHaveProperty('isLike',isLike);
    });

  });
});
