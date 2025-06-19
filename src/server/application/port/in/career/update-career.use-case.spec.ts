import { beforeAll, describe, expect, it } from "vitest";
import {
  UPDATE_CAREER_USE_CASE,
  UpdateCareerUseCase,
} from "./update-career.use-case";
import { di } from "~/server/infra/di";
import { CareerTestFeature } from "~/server/application/__mocks__/career";
import { User } from "~/server/domain/aggregate/user";
import { UserTestFeature } from "~/server/application/__mocks__/user";
import { UpdateCareerDataDto } from "~/server/application/dto/update-career-data.dto";
import { test } from "~/server/infra/test";

describe("UpdateCareerUseCase", () => {
  let updateCareerUseCase: UpdateCareerUseCase;
  let careerTestFeature: CareerTestFeature;
  let testUser: User;

  beforeAll(async () => {
    updateCareerUseCase = di.resolve(UPDATE_CAREER_USE_CASE);

    careerTestFeature = di.resolve(CareerTestFeature);

    const userTestFeature = di.resolve(UserTestFeature);
    testUser = await userTestFeature.createTestUser();

    return () => {
      userTestFeature.deleteTestUser(testUser.id);
    };
  });

  it("should be defined", () => {
    expect(updateCareerUseCase).toBeDefined();
  });

  describe("updateCareer", () => {
    test("커리어 수정 성공", async () => {
      // given
      const createdCareer = await careerTestFeature.createTestCareer(
        testUser.id,
      );
      const updateCareerData: UpdateCareerDataDto = {
        companyName: "Updated Company",
        position: "Updated Position",
        employmentType: "FullTime",
        locationType: "Hybrid",
        location: "Updated Location",
        startDate: new Date("2023-01-01"),
        endDate: new Date("2023-12-31"),
        isCurrentPosition: false,
        description: "Updated description",
        responsibilities: "Updated responsibilities",
        url: "https://updated-company.com",
        achievements: [
          {
            id: createdCareer.achievements[0].id,
            description: "Updated Achievement",
            metrics: "Updated Metrics",
          },
          {
            id: null,
            description: "New Achievement",
            metrics: null,
          },
        ],
      };

      // when
      const updatedCareer = await updateCareerUseCase.updateCareer(
        testUser.id,
        createdCareer.id,
        updateCareerData,
      );

      // then
      expect(updatedCareer).toBeDefined();
      expect(updatedCareer.companyName).toBe(updateCareerData.companyName);
      expect(updatedCareer.position).toBe(updateCareerData.position);
      expect(updatedCareer.employmentType).toBe(
        updateCareerData.employmentType,
      );
      expect(updatedCareer.locationType).toBe(updateCareerData.locationType);
      expect(updatedCareer.location).toBe(updateCareerData.location);
      expect(updatedCareer.startDate).toStrictEqual(updateCareerData.startDate);
      expect(updatedCareer.endDate).toStrictEqual(updateCareerData.endDate);
      expect(updatedCareer.isCurrentPosition).toBe(
        updateCareerData.isCurrentPosition,
      );
      expect(updatedCareer.description).toBe(updateCareerData.description);
      expect(updatedCareer.responsibilities).toBe(
        updateCareerData.responsibilities,
      );
      expect(updatedCareer.url).toBe(updateCareerData.url);

      expect(updatedCareer.achievements.length).toBe(
        updateCareerData.achievements.length,
      );

      updatedCareer.achievements.forEach((achievement, i) => {
        expect(achievement).toBeDefined();
        expect(achievement.description).toBe(
          updateCareerData.achievements[i].description,
        );
        expect(achievement.metrics).toBe(
          updateCareerData.achievements[i].metrics,
        );
      });
    });
  });
});
