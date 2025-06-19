import { beforeAll, describe, expect, it, test } from "vitest";
import { GET_CAREER_USE_CASE, GetCareerUseCase } from "./get-career.use-case";
import { di } from "~/server/infra/di";
import { User } from "~/server/domain/aggregate/user";
import { CareerTestFeature } from "~/server/application/__mocks__/career";
import { UserTestFeature } from "~/server/application/__mocks__/user";

describe("GetCareerUseCase", () => {
  let getCareerUseCase: GetCareerUseCase;
  let careerTestFeature: CareerTestFeature;
  let testUser: User;

  beforeAll(async () => {
    getCareerUseCase = di.resolve(GET_CAREER_USE_CASE);

    careerTestFeature = di.resolve(CareerTestFeature);

    const userTestFeature = di.resolve(UserTestFeature);
    testUser = await userTestFeature.createTestUser();

    return () => {
      userTestFeature.deleteTestUser(testUser.id);
    };
  });

  it("should be defined", () => {
    expect(getCareerUseCase).toBeDefined();
  });

  describe("getCareer", () => {
    test("커리어 조회 성공", async () => {
      // given
      const createdCareer = await careerTestFeature.createTestCareer(
        testUser.id,
      );

      // when
      const career = await getCareerUseCase.getCareer(createdCareer.id);

      if (!career) {
        throw new Error("Career not found");
      }

      // then
      expect(career).toBeDefined();
      expect(career.id).toBe(createdCareer.id);
      expect(career.companyName).toBe(createdCareer.companyName);
      expect(career.position).toBe(createdCareer.position);
      expect(career.employmentType).toBe(createdCareer.employmentType);
      expect(career.locationType).toBe(createdCareer.locationType);
      expect(career.location).toBe(createdCareer.location);
      expect(career.startDate).toStrictEqual(createdCareer.startDate);
      expect(career.endDate).toStrictEqual(createdCareer.endDate);
      expect(career.isCurrentPosition).toBe(createdCareer.isCurrentPosition);
      expect(career.description).toBe(createdCareer.description);
      expect(career.responsibilities).toBe(createdCareer.responsibilities);
      expect(career.url).toBe(createdCareer.url);
      expect(career.createdAt).toBeDefined();
    });

    test("커리어 조회 실패", async () => {
      // given
      const careerId = 0;

      // when
      const career = await getCareerUseCase.getCareer(careerId);

      // then
      expect(career).toBeNull();
    });
  });

  describe("getCareersByUserId", () => {
    test("커리어 조회 성공", async () => {
      // given
      await Promise.all(
        Array.from({ length: 3 }, () =>
          careerTestFeature.createTestCareer(testUser.id),
        ),
      );

      // when
      const careers = await getCareerUseCase.getCareersByUserId(testUser.id);

      // then
      expect(careers).toBeDefined();
      expect(careers.length).toBe(3);
    });
  });
});
