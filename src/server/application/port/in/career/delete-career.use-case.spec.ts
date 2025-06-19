import { beforeAll, describe, expect, it } from "vitest";
import {
  DELETE_CAREER_USE_CASE,
  DeleteCareerUseCase,
} from "./delete-career.use-case";
import { di } from "~/server/infra/di";
import { test } from "~/server/infra/test";
import { CareerTestFeature } from "~/server/application/__mocks__/career";
import { User } from "~/server/domain/aggregate/user";
import { UserTestFeature } from "~/server/application/__mocks__/user";
import { GET_CAREER_USE_CASE, GetCareerUseCase } from "./get-career.use-case";

describe("DeleteCareerUseCase", () => {
  let deleteCareerUseCase: DeleteCareerUseCase;
  let getCareerUseCase: GetCareerUseCase;
  let careerTestFeature: CareerTestFeature;
  let testUser: User;

  beforeAll(async () => {
    deleteCareerUseCase = di.resolve(DELETE_CAREER_USE_CASE);

    getCareerUseCase = di.resolve(GET_CAREER_USE_CASE);

    careerTestFeature = di.resolve(CareerTestFeature);

    const userTestFeature = di.resolve(UserTestFeature);
    testUser = await userTestFeature.createTestUser();

    return () => {
      userTestFeature.deleteTestUser(testUser.id);
    };
  });

  it("should be defined", () => {
    expect(deleteCareerUseCase).toBeDefined();
  });

  describe("deleteCareer", () => {
    test("커리어 삭제 성공", async () => {
      // given
      const createdCareer = await careerTestFeature.createTestCareer(
        testUser.id,
      );

      // when
      await expect(
        deleteCareerUseCase.deleteCareer(testUser.id, createdCareer.id),
      ).resolves.not.toThrowError();
      const deletedCareer = await getCareerUseCase.getCareer(createdCareer.id);

      // then
      expect(deletedCareer).toBeNull();
    });
  });
});
