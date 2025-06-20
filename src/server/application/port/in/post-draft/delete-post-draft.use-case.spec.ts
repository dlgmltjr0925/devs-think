import { beforeAll, describe, expect, it } from "vitest";
import {
  DELETE_POST_DRAFT_USE_CASE,
  type DeletePostDraftUseCase,
} from "./delete-post-draft.use-case";
import { di } from "~/server/infra/di";
import { PostDraftTestFeature } from "~/server/application/__mocks__/post-draft";
import { UserTestFeature } from "~/server/application/__mocks__/user";
import { User } from "~/server/domain/aggregate/user";
import { test } from "~/server/infra/test";

describe("DeletePostDraftUseCase", () => {
  let deletePostDraftUseCase: DeletePostDraftUseCase;
  let postDraftTestFeature: PostDraftTestFeature;
  let testUser: User;

  beforeAll(async () => {
    deletePostDraftUseCase = di.resolve<DeletePostDraftUseCase>(
      DELETE_POST_DRAFT_USE_CASE,
    );

    postDraftTestFeature = di.resolve(PostDraftTestFeature);

    const userTestFeature = di.resolve(UserTestFeature);
    testUser = await userTestFeature.createTestUser();

    return () => {
      userTestFeature.deleteTestUser(testUser.id);
    };
  });

  it("should be defined", () => {
    expect(deletePostDraftUseCase).toBeDefined();
  });

  describe("deletePostDraft", () => {
    test("Post Draft 삭제 성공", async () => {
      // given
      const postDraft = await postDraftTestFeature.createTestPostDraft(
        testUser.id,
      );

      // when & then
      await expect(
        deletePostDraftUseCase.deletePostDraft(testUser.id, postDraft.id),
      ).resolves.not.toThrow();
    });
  });
});
