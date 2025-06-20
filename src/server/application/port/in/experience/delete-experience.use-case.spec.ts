import { beforeAll, describe, expect, it, test } from "vitest";
import {
  DELETE_EXPERIENCE_USE_CASE,
  DeleteExperienceUseCase,
} from "./delete-experience.use-case";
import { di } from "~/server/infra/di";
import { ExperienceTestFeature } from "~/server/application/__mocks__/experience";
import { User } from "~/server/domain/aggregate/user";
import { UserTestFeature } from "~/server/application/__mocks__/user";
import {
  GET_EXPERIENCE_USE_CASE,
  GetExperienceUseCase,
} from "./get-experience.use-case";

describe("DeleteExperienceUseCase", () => {
  let deleteExperienceUseCase: DeleteExperienceUseCase;
  let getExperienceUseCase: GetExperienceUseCase;
  let experienceTestFeature: ExperienceTestFeature;
  let testUser: User;

  beforeAll(async () => {
    deleteExperienceUseCase = di.resolve(DELETE_EXPERIENCE_USE_CASE);

    getExperienceUseCase = di.resolve(GET_EXPERIENCE_USE_CASE);

    experienceTestFeature = di.resolve(ExperienceTestFeature);

    const userTestFeature = di.resolve(UserTestFeature);
    testUser = await userTestFeature.createTestUser();

    return () => {
      userTestFeature.deleteTestUser(testUser.id);
    };
  });

  it("should be defined", () => {
    expect(deleteExperienceUseCase).toBeDefined();
  });

  describe("deleteExperience", () => {
    test("삭제 성공", async () => {
      // given
      const experience = await experienceTestFeature.createTestExperience(
        testUser.id,
      );

      // when
      await expect(
        deleteExperienceUseCase.deleteExperience(testUser.id, experience.id),
      ).resolves.not.toThrowError();
      const deletedExperience = await getExperienceUseCase.getExperience(
        experience.id,
      );

      expect(deletedExperience).toBeNull();
    });
  });
});
