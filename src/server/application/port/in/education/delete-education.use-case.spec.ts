import { beforeAll, describe, expect, it, test } from "vitest";
import {
  DELETE_EDUCATION_USE_CASE,
  DeleteEducationUseCase,
} from "./delete-education.use-case";
import { EducationTestFeature } from "~/server/application/__mocks__/education";
import { di } from "~/server/infra/di";
import { User } from "~/server/domain/aggregate/user";
import { UserTestFeature } from "~/server/application/__mocks__/user";
import {
  GET_EDUCATION_USE_CASE,
  GetEducationUseCase,
} from "./get-education.use-case";

describe("DeleteEducationUseCase", () => {
  let deleteEducationUseCase: DeleteEducationUseCase;
  let getEducationUseCase: GetEducationUseCase;
  let educationTestFeature: EducationTestFeature;
  let testUser: User;

  beforeAll(async () => {
    deleteEducationUseCase = di.resolve(DELETE_EDUCATION_USE_CASE);

    getEducationUseCase = di.resolve(GET_EDUCATION_USE_CASE);

    educationTestFeature = di.resolve(EducationTestFeature);

    const userTestFeature = di.resolve(UserTestFeature);
    testUser = await userTestFeature.createTestUser();

    return () => {
      userTestFeature.deleteTestUser(testUser.id);
    };
  });

  it("should be defined", () => {
    expect(deleteEducationUseCase).toBeDefined();
  });

  describe("deleteEducation", () => {
    test("삭제 성공", async () => {
      // given
      const createdEducation = await educationTestFeature.createTestEducation(
        testUser.id,
      );

      // when
      await expect(
        deleteEducationUseCase.deleteEducation(
          testUser.id,
          createdEducation.id,
        ),
      ).resolves.not.toThrowError();
      const deletedEducation = await getEducationUseCase.getEducation(
        createdEducation.id,
      );

      // then
      expect(deletedEducation).toBeNull();
    });
  });
});
