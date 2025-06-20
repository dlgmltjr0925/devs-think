import { beforeAll, describe, expect, it } from "vitest";
import {
  UPDATE_POST_DRAFT_USE_CASE,
  type UpdatePostDraftUseCase,
} from "./update-post-draft.use-case";
import { PostDraftTestFeature } from "~/server/application/__mocks__/post-draft";
import { User } from "~/server/domain/aggregate/user";
import { di } from "~/server/infra/di";
import { test } from "~/server/infra/test";
import { UserTestFeature } from "~/server/application/__mocks__/user";
import { UpdatePostDraftDataDto } from "~/server/application/dto/update-post-draft-data.dto";

describe("UpdatePostDraftUseCase", () => {
  let updatePostDraftUseCase: UpdatePostDraftUseCase;
  let postDraftTestFeature: PostDraftTestFeature;
  let testUser: User;

  beforeAll(async () => {
    updatePostDraftUseCase = di.resolve<UpdatePostDraftUseCase>(
      UPDATE_POST_DRAFT_USE_CASE,
    );

    postDraftTestFeature = di.resolve(PostDraftTestFeature);

    const userTestFeature = di.resolve(UserTestFeature);
    testUser = await userTestFeature.createTestUser();

    return () => {
      userTestFeature.deleteTestUser(testUser.id);
    };
  });

  it("should be defined", () => {
    expect(updatePostDraftUseCase).toBeDefined();
  });

  describe("updatePostDraft", () => {
    test("Post Draft 수정 성공", async () => {
      // given
      const testPostDraft = await postDraftTestFeature.createTestPostDraft(
        testUser.id,
      );
      const updatePostDraftData: UpdatePostDraftDataDto = {
        title: "updated title",
        content: "updated content",
        tags: ["updated tag"],
      };

      // when
      const updatedPostDraft = await updatePostDraftUseCase.updatePostDraft(
        testUser.id,
        testPostDraft.id,
        updatePostDraftData,
      );

      // then
      expect(updatedPostDraft).toBeDefined();
      expect(updatedPostDraft.id).toBe(testPostDraft.id);
      expect(updatedPostDraft.title).toBe(updatePostDraftData.title);
      expect(updatedPostDraft.content).toBe(updatePostDraftData.content);
      expect(updatedPostDraft.tags).toStrictEqual(updatePostDraftData.tags);
      expect(updatedPostDraft.createdAt).toStrictEqual(testPostDraft.createdAt);
      expect(updatedPostDraft.updatedAt).not.toStrictEqual(
        testPostDraft.updatedAt,
      );
      expect(updatedPostDraft.deletedAt).toBeNull();
    });
  });
});
