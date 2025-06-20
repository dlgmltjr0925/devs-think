import { beforeAll, describe, expect, it } from "vitest";
import {
  GET_EXPERIENCE_USE_CASE,
  GetExperienceUseCase,
} from "./get-experience.use-case";
import { di } from "~/server/infra/di";
import { User } from "~/server/domain/aggregate/user";
import { UserTestFeature } from "~/server/application/__mocks__/user";
import { test } from "~/server/infra/test";
import { ExperienceTestFeature } from "~/server/application/__mocks__/experience";

describe("GetExperienceUseCase", () => {
  let getExperienceUseCase: GetExperienceUseCase;
  let experienceTestFeature: ExperienceTestFeature;
  let testUser: User;

  beforeAll(async () => {
    getExperienceUseCase = di.resolve(GET_EXPERIENCE_USE_CASE);

    experienceTestFeature = di.resolve(ExperienceTestFeature);

    const userTestFeature = di.resolve(UserTestFeature);
    testUser = await userTestFeature.createTestUser();

    return () => {
      userTestFeature.deleteTestUser(testUser.id);
    };
  });

  it("should be defined", () => {
    expect(getExperienceUseCase).toBeDefined();
  });

  describe("getExperience", () => {
    test("should return an experience", async () => {
      // given
      const createdExperience =
        await experienceTestFeature.createTestExperience(testUser.id);

      // when
      const experience = await getExperienceUseCase.getExperience(
        createdExperience.id,
      );

      if (!experience) {
        throw new Error("Experience not found");
      }

      // then
      expect(experience).toBeDefined();
      expect(experience.id).toBe(createdExperience.id);
      expect(experience.type).toBe(createdExperience.type);
      expect(experience.title).toBe(createdExperience.title);
      expect(experience.organization).toBe(createdExperience.organization);
      expect(experience.description).toBe(createdExperience.description);
      expect(experience.startedAt).toStrictEqual(createdExperience.startedAt);
      expect(experience.endedAt).toBeNull();
      expect(experience.isOngoing).toBe(createdExperience.isOngoing);
      expect(experience.url).toBe(createdExperience.url);
      expect(experience.certificationDetail).toBeNull();
      expect(experience.awardDetail).toBeNull();
      expect(experience.languageDetail).toBeNull();
      expect(experience.volunteerDetail).toBeNull();
      expect(experience.medias).toEqual([]);
      experience.skills.forEach((skill) => {
        const skillIds = createdExperience.skillIds.map(
          (skillId) => skillId.value,
        );
        expect(skillIds).toContain(skill.id);
      });
    });
  });
});
