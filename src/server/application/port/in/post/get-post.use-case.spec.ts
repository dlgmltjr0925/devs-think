import { beforeAll, describe, expect, it } from "vitest";
import { GET_POST_USE_CASE, GetPostUseCase } from "./get-post.use-case";
import { di } from "~/server/infra/di";
import { PostTestFeature } from "~/server/application/__mocks__/post";
import { User } from "~/server/domain/user";
import { UserTestFeature } from "~/server/application/__mocks__/user";
import { test } from "~/server/infra/test";

describe("GetPostUseCase", () => {
  let getPostUseCase: GetPostUseCase;
  let postTestFeature: PostTestFeature;
  let testUser: User;
  let otherUser: User;

  beforeAll(async () => {
    getPostUseCase = di.resolve<GetPostUseCase>(GET_POST_USE_CASE);

    postTestFeature = di.resolve(PostTestFeature);

    const userTestFeature = di.resolve(UserTestFeature);
    testUser = await userTestFeature.createTestUser();
    otherUser = await userTestFeature.createTestUser();

    return () => {
      userTestFeature.deleteTestUser(testUser.id);
      userTestFeature.deleteTestUser(otherUser.id);
    };
  });

  it("should be defined", () => {
    expect(getPostUseCase).toBeDefined();
  });

  describe("getPost", () => {
    test("Post 조회 성공", async () => {
      // given
      const createdPost = await postTestFeature.createTestPost(testUser.id);

      // when
      const post = await getPostUseCase.getPost(testUser.id, createdPost.id);

      if (!post) {
        throw new Error("Post not found");
      }

      // then
      expect(post).toBeDefined();
      expect(post.id).toBe(createdPost.id);
      expect(post.userId).toBe(testUser.id);
      expect(post.title).toBe(createdPost.title);
      expect(post.content).toBe(createdPost.content);
      expect(post.tags).toEqual(createdPost.tags);
      expect(post.thumbnailUrl).toBe(createdPost.thumbnailUrl);
      expect(post.cleanUrl).toBe(createdPost.cleanUrl);
      expect(post.isPublic).toBe(createdPost.isPublic);
      expect(post.createdAt).toBeDefined();
      expect(post.updatedAt).toBeDefined();
      expect(post.deletedAt).toBeNull();
    });

    test("작성자가 비공개 포스트의 조회", async () => {
      // given
      const createdPost = await postTestFeature.createTestPrivatePost(
        testUser.id,
      );

      // when
      const post = await getPostUseCase.getPost(testUser.id, createdPost.id);

      if (!post) {
        throw new Error("Post not found");
      }

      // then
      expect(post).toBeDefined();
      expect(post.isPublic).toBe(false);
    });

    test("작성자가 아닌데 비공개 포스트의 경우 조회 실패", async () => {
      // given
      const createdPost = await postTestFeature.createTestPrivatePost(
        testUser.id,
      );

      // when
      const post = await getPostUseCase.getPost(otherUser.id, createdPost.id);

      // then
      expect(post).toBeNull();
    });
  });

  describe("getMyPostsByTagId", () => {
    test("내가 작성한 Post 목록 조회 성공", async () => {
      // given
      await Promise.all([
        postTestFeature.createTestPost(testUser.id),
        postTestFeature.createTestPrivatePost(testUser.id),
      ]);

      // when
      const posts = await getPostUseCase.getMyPostsByTagId(testUser.id);

      // then
      expect(posts).toBeDefined();
      expect(posts.data.length).toBe(2);
      expect(posts.totalCount).toBe(2);
      expect(posts.hasNext).toBe(false);
      expect(posts.hasPrev).toBe(false);
      expect(posts.nextCursor).toBeNull();
      expect(posts.prevCursor).toBeNull();
    });

    test("내가 작성한 Post가 20개가 넘을 경우 20개 단위로 조회", async () => {
      // given
      await Promise.all(
        Array.from({ length: 21 }, () =>
          postTestFeature.createTestPost(testUser.id),
        ),
      );

      // when
      const posts = await getPostUseCase.getMyPostsByTagId(testUser.id);

      // then
      expect(posts).toBeDefined();
      expect(posts.data.length).toBe(20);
      expect(posts.totalCount).toBe(21);
      expect(posts.hasNext).toBe(true);
      expect(posts.hasPrev).toBe(false);
      expect(posts.nextCursor).toBeDefined();
      expect(posts.prevCursor).toBeNull();

      // when
      const nextPosts = await getPostUseCase.getMyPostsByTagId(
        testUser.id,
        undefined,
        posts.nextCursor ?? undefined,
      );

      // then
      expect(nextPosts).toBeDefined();
      expect(nextPosts.data.length).toBe(1);
      expect(nextPosts.totalCount).toBe(21);
      expect(nextPosts.hasNext).toBe(false);
      expect(nextPosts.hasPrev).toBe(true);
      expect(nextPosts.nextCursor).toBeNull();
      expect(nextPosts.prevCursor).toBeDefined();
    });

    test("타인의 공개 포스트 리스트를 조회 성공", async () => {
      // given
      await Promise.all([
        postTestFeature.createTestPost(testUser.id),
        postTestFeature.createTestPrivatePost(testUser.id),
      ]);

      // when
      const posts = await getPostUseCase.getPublicPostsByUserIdAndTagId(
        testUser.id,
      );

      // then
      expect(posts).toBeDefined();
      expect(posts.data.length).toBe(1);
      expect(posts.totalCount).toBe(1);
      expect(posts.hasNext).toBe(false);
      expect(posts.hasPrev).toBe(false);
      expect(posts.nextCursor).toBeNull();
      expect(posts.prevCursor).toBeNull();
    });

    test("타인의 공개 포스트 리스트를 조회 성공", async () => {
      await Promise.all([
        ...Array.from({ length: 21 }, () =>
          postTestFeature.createTestPost(testUser.id),
        ),
        ...Array.from({ length: 1 }, () =>
          postTestFeature.createTestPrivatePost(testUser.id),
        ),
      ]);

      // when
      const posts = await getPostUseCase.getPublicPostsByUserIdAndTagId(
        testUser.id,
      );

      // then
      expect(posts).toBeDefined();
      expect(posts.data.length).toBe(20);
      expect(posts.totalCount).toBe(21);
      expect(posts.hasNext).toBe(true);
      expect(posts.hasPrev).toBe(false);
      expect(posts.nextCursor).toBeDefined();
      expect(posts.prevCursor).toBeNull();

      // when
      const nextPosts = await getPostUseCase.getPublicPostsByUserIdAndTagId(
        testUser.id,
        undefined,
        posts.nextCursor ?? undefined,
      );

      // then
      expect(nextPosts).toBeDefined();
      expect(nextPosts.data.length).toBe(1);
      expect(nextPosts.totalCount).toBe(21);
      expect(nextPosts.hasNext).toBe(false);
      expect(nextPosts.hasPrev).toBe(true);
      expect(nextPosts.nextCursor).toBeNull();
      expect(nextPosts.prevCursor).toBeDefined();
    });
  });
});
