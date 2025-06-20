import { beforeAll, describe, expect, it } from "vitest";
import {
  DELETE_POST_USE_CASE,
  DeletePostUseCase,
} from "./delete-post.use-case";
import { di } from "~/server/infra/di";
import { test } from "~/server/infra/test";
import { PostTestFeature } from "~/server/application/__mocks__/post";
import { User } from "~/server/domain/aggregate/user";
import { UserTestFeature } from "~/server/application/__mocks__/user";
import { GET_POST_USE_CASE, GetPostUseCase } from "./get-post.use-case";

describe("DeletePostUseCase", () => {
  let deletePostUseCase: DeletePostUseCase;
  let getPostUseCase: GetPostUseCase;
  let postTestFeature: PostTestFeature;
  let testUser: User;

  beforeAll(async () => {
    deletePostUseCase = di.resolve(DELETE_POST_USE_CASE);
    getPostUseCase = di.resolve(GET_POST_USE_CASE);

    postTestFeature = di.resolve(PostTestFeature);

    const userTestFeature = di.resolve(UserTestFeature);
    testUser = await userTestFeature.createTestUser();

    return () => {
      userTestFeature.deleteTestUser(testUser.id);
    };
  });

  it("should be defined", () => {
    expect(deletePostUseCase).toBeDefined();
  });

  describe("deletePost", () => {
    test("포스트 삭제 성공", async () => {
      // given
      const createdPost = await postTestFeature.createTestPost(testUser.id);

      // when
      await expect(
        deletePostUseCase.deletePost(testUser.id, createdPost.id),
      ).resolves.not.toThrow();

      // then
      const deletedPost = await getPostUseCase.getPost(
        testUser.id,
        createdPost.id,
      );

      // then
      expect(deletedPost).toBeNull();
    });
  });
});
