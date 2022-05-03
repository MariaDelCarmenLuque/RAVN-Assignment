import { clearDatabase, prisma } from "../prisma";
import { CommentFactory } from "../utils/factories/comment.factory";
import { PostFactory } from "../utils/factories/post.factory";
import { CommentsService } from "./comments.service";
import { Comment, Post } from "@prisma/client";
import { CreateCommentDto } from "../dtos/comments/request/create-comment.dto";
import { plainToClass } from "class-transformer";
import { UpdateCommentDto } from "../dtos/comments/request/update-comment.dto";
import faker from "@faker-js/faker";
import { notContains } from "class-validator";

jest.spyOn(console, "error").mockImplementation(jest.fn());

describe("CommentService", () => {
  let postFactory: PostFactory;
  let commentFactory: CommentFactory;
  let comments: Comment[];

  beforeAll(() => {
    commentFactory = new CommentFactory(prisma);
    postFactory = new PostFactory(prisma);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await clearDatabase();
    await prisma.$disconnect();
  });

  describe("find", () => {
    let post: Post;
    beforeAll(async () => {
      post = await postFactory.make();
      comments = await commentFactory.makeMany(5, {
        post: {
          connect: {
            id: post.id,
          },
        },
      });
    });

    it("should return all the created comments", async () => {
      const result = await CommentsService.find(post.id);
      expect(result.length).toBe(comments.length);
    });
  });

  describe("create", () => {
    let comment: Comment;
    let post: Post;
    beforeAll(async () => {
      comment = await commentFactory.make();
      post = await postFactory.make();
      jest.mock("jsonwebtoken", () => ({
        sign: jest.fn().mockImplementation(() => "my.jwt.token"),
      }));
    });
    it("should create a new comment", async () => {
      const data = plainToClass(CreateCommentDto, comment);
      const result = await CommentsService.create(data, post.id);
      expect(result.id).toBeTruthy()
    });
  });

  describe("update", () => {
    let comment: Comment;
    let post: Post;
    beforeAll(async () => {
      post = await postFactory.make();
      comment = await commentFactory.make();
    });

    it("should update the comment", async () => {
      const data = plainToClass(CreateCommentDto, comment);
      await expect(
        CommentsService.update(post.id, data)
      ).rejects.toThrowError();
    });
    it("should throw an error if the comment does not existe", async () => {
      const data = plainToClass(UpdateCommentDto, {});
      await expect(
        CommentsService.update(faker.datatype.number(), data)
      ).rejects.toThrowError();
    });
  });

  describe("deleteComment", () => {
    let post: Post;
    let comment: Comment;
    beforeAll(async () => {
      post = await postFactory.make();
      comment=await commentFactory.make();
      jest.mock("jsonwebtoken", () => ({
        sign: jest.fn().mockImplementation(() => "my.jwt.token"),
      }));
    });

    it("Throw an error if the comment does not exist", async () => {
      await expect(
        CommentsService.delete(faker.datatype.number())
      ).rejects.toThrowError();
    });
    it("should delete the comment", async () => {
      const result = await CommentsService.delete(comment.id);

      expect(result.deletedAt).not.toBeNull();
    });
  });
});
