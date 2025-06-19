import { beforeAll, describe, expect, it } from "vitest";
import {
  CREATE_CAREER_USE_CASE,
  CreateCareerUseCase,
} from "./create-career.use-case";
import { di } from "~/server/infra/di";
import { User } from "~/server/domain/aggregate/user";
import { UserTestFeature } from "~/server/application/__mocks__/user";
import { mockCreateCareerDataDto } from "~/server/application/__mocks__/career";
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

      // when
      const career = await createCareerUseCase.createCareer(
        testUser.id,
        mockCreateCareerDataDto,
      );

      // then
      expect(career).toBeDefined();
      expect(career.companyName).toBe(mockCreateCareerDataDto.companyName);
      expect(career.position).toBe(mockCreateCareerDataDto.position);
      expect(career.employmentType).toBe(
        mockCreateCareerDataDto.employmentType,
      );
      expect(career.locationType).toBe(mockCreateCareerDataDto.locationType);
      expect(career.location).toBe(mockCreateCareerDataDto.location);
      expect(career.startDate).toStrictEqual(mockCreateCareerDataDto.startDate);
      expect(career.endDate).toStrictEqual(mockCreateCareerDataDto.endDate);
      expect(career.isCurrentPosition).toBe(
        mockCreateCareerDataDto.isCurrentPosition,
      );
      expect(career.description).toBe(mockCreateCareerDataDto.description);
      expect(career.responsibilities).toBe(
        mockCreateCareerDataDto.responsibilities,
      );
      expect(career.url).toBe(mockCreateCareerDataDto.url);
      expect(career.createdAt).toBeDefined();
      expect(career.updatedAt).toBeDefined();

      career.achievements.forEach((achievement) => {
        expect(achievement).toBeDefined();
        expect(achievement.description).toBe(
          mockCreateCareerDataDto.achievements[0].description,
        );
        expect(achievement.metrics).toBe(
          mockCreateCareerDataDto.achievements[0].metrics,
        );
        expect(achievement.createdAt).toBeDefined();
        expect(achievement.updatedAt).toBeDefined();
      });
    });
  });
});
