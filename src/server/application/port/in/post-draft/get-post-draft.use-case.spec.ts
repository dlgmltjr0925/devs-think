import { beforeAll, describe, expect, it } from "vitest";
import {
  GET_POST_DRAFT_USE_CASE,
  type GetPostDraftUseCase,
} from "./get-post-draft.use-case";
import { di } from "~/server/infra/di";
import { test } from "~/server/infra/test";
import { User } from "~/server/domain/aggregate/user";
import { UserTestFeature } from "~/server/application/__mocks__/user";
import { PostDraftTestFeature } from "~/server/application/__mocks__/post-draft";
import { ForbiddenError } from "~/shared/error";

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

      if (!postDraft) {
        throw new Error("Post Draft not found");
      }

      // then

      expect(postDraft).toBeDefined();
      expect(postDraft.id).toBe(testPostDraft.id);
      expect(postDraft.userId).toBe(testUser.id);
      expect(postDraft.title).toBe(testPostDraft.title);
      expect(postDraft.content).toBe(testPostDraft.content);
      expect(postDraft.createdAt).toStrictEqual(testPostDraft.createdAt);
      expect(postDraft.updatedAt).toStrictEqual(testPostDraft.updatedAt);
    });

    test("등록되지 않은 Post Draft 조회시 No Content Error 반환", async () => {
      // given
      const notExistPostDraftId = 1000000000;

      // when & then
      const postDraft = await getPostDraftUseCase.getPostDraft(
        testUser.id,
        notExistPostDraftId,
      );

      expect(postDraft).toBeNull();
    });

    test("다른 사람의 Post Draft 조회시 Forbidden Error 반환", async () => {
      // given
      const testPostDraft = await postDraftTestFeature.createTestPostDraft(
        testUser.id,
      );

      // when & then
      await expect(
        getPostDraftUseCase.getPostDraft(testUser.id + 1, testPostDraft.id),
      ).rejects.toThrow(ForbiddenError);
    });

    test("Post Draft 삭제된 경우 No Content 에러 반환", async () => {
      // given
      const testPostDraft = await postDraftTestFeature.createTestPostDraft(
        testUser.id,
      );

      await postDraftTestFeature.deleteTestPostDraft(testPostDraft.id);

      // when & then
      const postDraft = await getPostDraftUseCase.getPostDraft(
        testUser.id,
        testPostDraft.id,
      );

      expect(postDraft).toBeNull();
    });
  });

  describe("getPostDrafts", () => {
    test("사용자가 등록한 Post Draft가 없는 경우 빈 배열 반환", async () => {
      // given

      // when
      const postDrafts = await getPostDraftUseCase.getPostDrafts(testUser.id);

      expect(postDrafts).toHaveLength(0);
    });

    test("Post Drafts 조회 성공", async () => {
      // given
      const testPostDrafts = await Promise.all([
        postDraftTestFeature.createTestPostDraft(testUser.id),
        postDraftTestFeature.createTestPostDraft(testUser.id),
        postDraftTestFeature.createTestPostDraft(testUser.id),
      ]);

      // when
      const postDrafts = await getPostDraftUseCase.getPostDrafts(testUser.id);

      expect(postDrafts).toHaveLength(testPostDrafts.length);
    });

    test("Post Drafts 삭제시 삭제된 Post Draft 제외하고 조회", async () => {
      // given
      const testPostDraft = await postDraftTestFeature.createTestPostDraft(
        testUser.id,
      );
      await postDraftTestFeature.deleteTestPostDraft(testPostDraft.id);

      // when
      const postDrafts = await getPostDraftUseCase.getPostDrafts(testUser.id);

      expect(postDrafts).toHaveLength(0);
    });
  });
});
