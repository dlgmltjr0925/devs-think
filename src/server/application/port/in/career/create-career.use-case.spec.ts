import { beforeAll, describe, expect, it } from "vitest";
import {
  CREATE_CAREER_USE_CASE,
  CreateCareerUseCase,
} from "./create-career.use-case";
import { di } from "~/server/infra/di";
import { User } from "~/server/domain/aggregate/user";
import { UserTestFeature } from "~/server/application/__mocks__/user";
import { CreateCareerDataDto } from "~/server/application/dto/create-career-data.dto";
import { test } from "~/server/infra/test";

describe("CreateCareerUseCase", () => {
  let createCareerUseCase: CreateCareerUseCase;
  let testUser: User;

  beforeAll(async () => {
    createCareerUseCase = di.resolve(CREATE_CAREER_USE_CASE);

    const userTestFeature = di.resolve(UserTestFeature);
    testUser = await userTestFeature.createTestUser();

    return () => {
      userTestFeature.deleteTestUser(testUser.id);
    };
  });

  it("should be defined", async () => {
    expect(createCareerUseCase).toBeDefined();
  });

  describe("createCareer", () => {
    test("커리어 생성 성공", async () => {
      // given
      const createCareerData: CreateCareerDataDto = {
        companyName: "Test Company",
        position: "Test Position",
        employmentType: "FullTime",
        locationType: "Office",
        location: "Test Location",
        startDate: new Date(),
        endDate: null,
        isCurrentPosition: false,
        description: "Test Description",
        responsibilities: "Test Responsibilities",
        url: "https://test.com",
        achievements: [
          {
            description: "Test Achievement",
            metrics: "Test Metrics",
          },
        ],
      };

      // when
      const career = await createCareerUseCase.createCareer(
        testUser.id,
        createCareerData,
      );

      // then
      expect(career).toBeDefined();
      expect(career.companyName).toBe(createCareerData.companyName);
      expect(career.position).toBe(createCareerData.position);
      expect(career.employmentType).toBe(createCareerData.employmentType);
      expect(career.locationType).toBe(createCareerData.locationType);
      expect(career.location).toBe(createCareerData.location);
      expect(career.startDate).toStrictEqual(createCareerData.startDate);
      expect(career.endDate).toStrictEqual(createCareerData.endDate);
      expect(career.isCurrentPosition).toBe(createCareerData.isCurrentPosition);
      expect(career.description).toBe(createCareerData.description);
      expect(career.responsibilities).toBe(createCareerData.responsibilities);
      expect(career.url).toBe(createCareerData.url);
      expect(career.createdAt).toBeDefined();
      expect(career.updatedAt).toBeDefined();

      career.achievements.forEach((achievement) => {
        expect(achievement).toBeDefined();
        expect(achievement.description).toBe(
          createCareerData.achievements[0].description,
        );
        expect(achievement.metrics).toBe(
          createCareerData.achievements[0].metrics,
        );
        expect(achievement.createdAt).toBeDefined();
        expect(achievement.updatedAt).toBeDefined();
      });
    });
  });
});
