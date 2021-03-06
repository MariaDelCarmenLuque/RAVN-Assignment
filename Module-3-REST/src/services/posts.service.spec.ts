import { Post } from "@prisma/client";
import faker from "@faker-js/faker";
import { plainToClass } from "class-transformer";
import { clearDatabase, prisma } from "../prisma";
import { PostFactory } from "../utils/factories/post.factory";
import { PostsService } from "./posts.service";
import { UpdatePostDto } from "../dtos/posts/request/update-post.dto";
import { NotFound } from "http-errors";
import { CreatePostDto } from "../dtos/posts/request/create-post.dto";

jest.spyOn(console, "error").mockImplementation(jest.fn());

describe("PostService", () => {
  let postFactory: PostFactory;
  let posts: Post[];

  beforeAll(() => {
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
    beforeAll(async () => {
      posts = await postFactory.makeMany(5);
    });

    it("should return all the created posts", async () => {
      const result = await PostsService.find();
      expect(result.length).toBe(posts.length);
    });
  });

  describe("create", () => {
    beforeAll(async () => {
      jest.mock("jsonwebtoken", () => ({
        sign: jest.fn().mockImplementation(() => "my.jwt.token"),
      }));
    });
    it("should create a new post", async () => {
      const a = {
        title:  faker.datatype.string(100),
        image: faker.image.image(),
        brief: faker.datatype.string(255),
        isDraft: faker.datatype.boolean(),
        content: faker.lorem.paragraph(),
      }
      const data = plainToClass(CreatePostDto, a);
      const result = await PostsService.create(data);
      expect(data).toHaveProperty('title',result.title);
    });
  });

  describe("findOne", () => {
    let post: Post;

    beforeAll(async () => {
      post = await postFactory.make();
    });

    it("should throw an error if the post does not exist", async () => {
      await expect(
        PostsService.findOne(faker.datatype.number())
      ).rejects.toThrowError(new NotFound("No Post found"));
    });

    it("should return the post", async () => {
      const result = await PostsService.findOne(post.id);

      expect(result).toHaveProperty("id", post.id);
    });
  });

  describe("update", () => {
    beforeAll(() => {
      jest.mock("jsonwebtoken", () => ({
        sign: jest.fn().mockImplementation(() => "my.jwt.token"),
      }));
    });

    it("should throw an error if the post does not exist", async () => {
      const data = plainToClass(UpdatePostDto, {});
      await expect(
        PostsService.update(faker.datatype.number(), data)
      ).rejects.toThrowError();
    });

    it("should update the post", async () => {
      const post = await postFactory.make();
      const title = faker.hacker.phrase();
      const data = plainToClass(UpdatePostDto, { title });

      const result = await PostsService.update(post.id, data);

      expect(result).toHaveProperty("title", title);
    });
  });

  describe("deletePost", () => {
    let post: Post;
    beforeAll(async () => {
      post = await postFactory.make();
    });

    it("Throw an error if the post does not exist", async () => {
      await expect(
        PostsService.delete(faker.datatype.number())
      ).rejects.toThrowError();
    });

    it("should delete the post", async () => {
      const result = await PostsService.delete(post.id);
      const findResult = await PostsService.findOne(post.id);
      expect(findResult.deletedAt).not.toBeNull();
    });
  });
});
