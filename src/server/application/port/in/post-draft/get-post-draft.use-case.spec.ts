import { beforeAll, describe, expect, it } from "vitest";
import {
  GET_POST_DRAFT_USE_CASE,
  type GetPostDraftUseCase,
} from "./get-post-draft.use-case";
import { di } from "~/server/infra/di";
import { test } from "~/server/infra/test";
import { User } from "~/server/domain/user";
import { UserTestFeature } from "~/server/application/__mocks__/user";
import { PostDraft } from "~/server/domain/entities/post-draft";
import { PostDraftTestFeature } from "~/server/application/__mocks__/post-draft";

describe("GetPostDraftUseCase", () => {
  let getPostDraftUseCase: GetPostDraftUseCase;
  let postDraftTestFeature: PostDraftTestFeature;
  let testUser: User;

  beforeAll(async () => {
    getPostDraftUseCase = di.resolve<GetPostDraftUseCase>(
      GET_POST_DRAFT_USE_CASE,
    );

    postDraftTestFeature = di.resolve(PostDraftTestFeature);

    const userTestFeature = di.resolve(UserTestFeature);
    testUser = await userTestFeature.createTestUser();

    return () => {
      userTestFeature.deleteTestUser(testUser.id);
    };
  });

  it("should be defined", () => {
    expect(getPostDraftUseCase).toBeDefined();
  });

  describe("getPostDraft", () => {
    test("Post Draft 조회 성공", async () => {
      // given
      const testPostDraft = await postDraftTestFeature.createTestPostDraft(
        testUser.id,
      );

      // when
      const postDraft = await getPostDraftUseCase.getPostDraft(
        testUser.id,
        testPostDraft.id,
      );

      // then
      expect(postDraft).toBeDefined();
      expect(postDraft.id).toBe(testPostDraft.id);
      expect(postDraft.userId).toBe(testUser.id);
      expect(postDraft.title).toBe(testPostDraft.title);
      expect(postDraft.content).toBe(testPostDraft.content);
      expect(postDraft.createdAt).toStrictEqual(testPostDraft.createdAt);
      expect(postDraft.updatedAt).toStrictEqual(testPostDraft.updatedAt);
    });
  });
});
