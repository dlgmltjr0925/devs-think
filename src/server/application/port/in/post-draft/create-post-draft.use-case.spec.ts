import { plainToClass } from "class-transformer";
import { beforeAll, describe, expect, it } from "vitest";
import { CreatePostDraftDataDto } from "~/server/application/dto/create-post-draft-data.dto";
import {
  CREATE_POST_DRAFT_USE_CASE,
  CreatePostDraftUseCase,
} from "~/server/application/port/in/post-draft";
import { di } from "~/server/infra/di";
import { User } from "~/server/domain/user";
import { test } from "~/server/infra/test";
import { UserTestFeature } from "~/server/application/__mocks__/user";
import { mockCreatePostDraftData } from "~/server/application/__mocks__/post-draft/mocks";

describe("CreatePostDraftUseCase", () => {
  let createPostDraftUseCase: CreatePostDraftUseCase;
  let testUser: User;

  beforeAll(async () => {
    createPostDraftUseCase = di.resolve<CreatePostDraftUseCase>(
      CREATE_POST_DRAFT_USE_CASE,
    );

    const userTestFeature = di.resolve(UserTestFeature);
    testUser = await userTestFeature.createTestUser();

    return () => {
      userTestFeature.deleteTestUser(testUser.id);
    };
  });

  it("should be defined", () => {
    expect(createPostDraftUseCase).toBeDefined();
  });

  describe("createPostDraft", () => {
    const testPostDraftData = plainToClass(CreatePostDraftDataDto, {
      title: "test title",
      content: "test content",
      tags: ["test"],
    });

    test("사용자가 임시 저장을 할 경우 Post Draft가 생성된다", async () => {
      // given

      // when
      const createdPostDraft = await createPostDraftUseCase.createPostDraft(
        testUser.id,
        mockCreatePostDraftData,
      );

      // then
      expect(createdPostDraft).toBeDefined();
      expect(createdPostDraft.id).toBeDefined();
      expect(createdPostDraft.userId).toBe(testUser.id);
      expect(createdPostDraft.title).toBe(testPostDraftData.title);
      expect(createdPostDraft.content).toBe(testPostDraftData.content);
      expect(createdPostDraft.tags).toEqual(testPostDraftData.tags);
      expect(createdPostDraft.postId).toBeNull();
      expect(createdPostDraft.createdAt).toBeDefined();
      expect(createdPostDraft.updatedAt).toBeDefined();
      expect(createdPostDraft.deletedAt).toBeNull();
    });
  });
});
