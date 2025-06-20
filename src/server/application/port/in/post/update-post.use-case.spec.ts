import { beforeAll, describe, expect, it } from "vitest";
import {
  UPDATE_POST_USE_CASE,
  UpdatePostUseCase,
} from "./update-post.use-case";
import { di } from "~/server/infra/di";
import { PostTestFeature } from "~/server/application/__mocks__/post";
import { User } from "~/server/domain/aggregate/user";
import { UserTestFeature } from "~/server/application/__mocks__/user";
import { UpdatePostDataDto } from "~/server/application/dto/update-post-data.dto";
import { test } from "~/server/infra/test";

describe("UpdatePostUseCase", () => {
  let updatePostUseCase: UpdatePostUseCase;
  let postTestFeature: PostTestFeature;
  let testUser: User;

  beforeAll(async () => {
    updatePostUseCase = di.resolve(UPDATE_POST_USE_CASE);

    postTestFeature = di.resolve(PostTestFeature);

    const userTestFeature = di.resolve(UserTestFeature);
    testUser = await userTestFeature.createTestUser();

    return () => {
      userTestFeature.deleteTestUser(testUser.id);
    };
  });

  it("should be defined", () => {
    expect(updatePostUseCase).toBeDefined();
  });

  describe("updatePost", () => {
    test("포스트 수정 성공", async () => {
      // given
      const createdPost = await postTestFeature.createTestPost(testUser.id);
      const updatePostData: UpdatePostDataDto = {
        title: "updated title",
        content: "updated content",
        tags: ["test1", "updated tag1", "updated tag2"],
        thumbnailUrl: "updated thumbnailUrl",
        cleanUrl: "updated cleanUrl",
        isPublic: false,
        postDraftId: null,
      };

      // when
      const updatedPost = await updatePostUseCase.updatePost(
        testUser.id,
        createdPost.id,
        updatePostData,
      );

      // then
      expect(updatedPost).toBeDefined();
      expect(updatedPost.title).toBe(updatePostData.title);
      expect(updatedPost.content).toBe(updatePostData.content);
      expect(updatedPost.tags).toStrictEqual(updatePostData.tags);
      expect(updatedPost.thumbnailUrl).toBe(updatePostData.thumbnailUrl);
      expect(updatedPost.cleanUrl).toBe(updatePostData.cleanUrl);
      expect(updatedPost.isPublic).toBe(updatePostData.isPublic);
    });
  });
});
