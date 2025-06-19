import { beforeAll, describe, expect, it } from "vitest";
import {
  CREATE_POST_USE_CASE,
  CreatePostUseCase,
} from "./create-post.use-case";
import { di } from "~/server/infra/di";
import { test } from "~/server/infra/test";
import { UserTestFeature } from "~/server/application/__mocks__/user";
import { User } from "~/server/domain/aggregate/user";
import { PostDraftTestFeature } from "~/server/application/__mocks__/post-draft";
import { mockCreatePostData } from "~/server/application/__mocks__/post";

describe("CreatePostUseCase", () => {
  let createPostUseCase: CreatePostUseCase;
  let postDraftTestFeature: PostDraftTestFeature;
  let testUser: User;

  beforeAll(async () => {
    createPostUseCase = di.resolve<CreatePostUseCase>(CREATE_POST_USE_CASE);

    postDraftTestFeature = di.resolve(PostDraftTestFeature);

    const userTestFeature = di.resolve(UserTestFeature);
    testUser = await userTestFeature.createTestUser();

    return () => {
      userTestFeature.deleteTestUser(testUser.id);
    };
  });

  it("should be defined", () => {
    expect(createPostUseCase).toBeDefined();
  });

  describe("createPost", () => {
    test("게시를 할 경우 Post가 생성된다.", async () => {
      // given
      const createPostData = { ...mockCreatePostData, userId: testUser.id };

      // when
      const createdPost = await createPostUseCase.createPost(
        testUser.id,
        createPostData,
      );

      // then
      expect(createdPost).toBeDefined();
      expect(createdPost.id).toBeDefined();
      expect(createdPost.userId).toBe(testUser.id);
      expect(createdPost.title).toBe(createPostData.title);
      expect(createdPost.content).toBe(createPostData.content);
      expect(createdPost.tags).toEqual(createPostData.tags);
      expect(createdPost.thumbnailUrl).toBe(createPostData.thumbnailUrl);
      expect(createdPost.cleanUrl).toBe(createPostData.cleanUrl);
      expect(createdPost.isPublic).toBe(createPostData.isPublic);
      expect(createdPost.createdAt).toBeDefined();
      expect(createdPost.updatedAt).toBeDefined();
      expect(createdPost.deletedAt).toBeNull();
    });

    test("Post Draft가 있는 경우 Post Draft는 삭제되고 Post가 생성된다.", async () => {
      // given
      const postDraft = await postDraftTestFeature.createTestPostDraft(
        testUser.id,
      );
      const createPostData = {
        ...mockCreatePostData,
        userId: testUser.id,
        postDraftId: postDraft.id,
      };

      // when
      const createdPost = await createPostUseCase.createPost(
        testUser.id,
        createPostData,
      );
      const deletedPostDraft = await postDraftTestFeature.getPostDraft(
        postDraft.id,
      );

      // then
      expect(deletedPostDraft).toBeNull();
      expect(createdPost).toBeDefined();
      expect(createdPost.id).toBeDefined();
      expect(createdPost.userId).toBe(testUser.id);
      expect(createdPost.title).toBe(createPostData.title);
      expect(createdPost.content).toBe(createPostData.content);
      expect(createdPost.tags).toEqual(createPostData.tags);
      expect(createdPost.thumbnailUrl).toBe(createPostData.thumbnailUrl);
      expect(createdPost.cleanUrl).toBe(createPostData.cleanUrl);
      expect(createdPost.isPublic).toBe(createPostData.isPublic);
      expect(createdPost.createdAt).toBeDefined();
      expect(createdPost.updatedAt).toBeDefined();
      expect(createdPost.deletedAt).toBeNull();
    });
  });
});
