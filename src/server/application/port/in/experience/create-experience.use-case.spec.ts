import { beforeAll, describe, expect, it } from "vitest";
import {
  CREATE_EXPERIENCE_USE_CASE,
  CreateExperienceUseCase,
} from "./create-experience.use-case";
import { di } from "~/server/infra/di";
import { test } from "~/server/infra/test";
import { User } from "~/server/domain/aggregate/user";
import { UserTestFeature } from "~/server/application/__mocks__/user";
import { CreateExperienceDataDto } from "~/server/application/dto/create-experience-data.dto";
import { SkillTestFeature } from "~/server/application/__mocks__/skill";

describe("CreateExperienceUseCase", () => {
  let createExperienceUseCase: CreateExperienceUseCase;
  let skillTestFeature: SkillTestFeature;
  let testUser: User;

  beforeAll(async () => {
    createExperienceUseCase = di.resolve(CREATE_EXPERIENCE_USE_CASE);

    skillTestFeature = di.resolve(SkillTestFeature);

    const userTestFeature = di.resolve(UserTestFeature);
    testUser = await userTestFeature.createTestUser();

    return () => {
      userTestFeature.deleteTestUser(testUser.id);
    };
  });

  it("should be defined", () => {
    expect(createExperienceUseCase).toBeDefined();
  });

  describe("createExperience", () => {
    test("should create experience", async () => {
      const skills = await Promise.all([
        skillTestFeature.createTestSkill(testUser.id, "react"),
        skillTestFeature.createTestSkill(testUser.id, "next.js"),
      ]);
      const createExperienceData: CreateExperienceDataDto = {
        type: "Certification",
        title: "test",
        organization: "test",
        description: "test",
        startedAt: new Date(),
        endedAt: null,
        isOngoing: false,
        url: "test",
        certificationDetail: null,
        awardDetail: null,
        languageDetail: null,
        volunteerDetail: null,
        medias: [],
        skillIds: skills.map((skill) => skill.id),
      };

      const experience = await createExperienceUseCase.createExperience(
        testUser.id,
        createExperienceData,
      );

      expect(experience).toBeDefined();
      expect(experience.type).toBe(createExperienceData.type);
      expect(experience.title).toBe(createExperienceData.title);
      expect(experience.organization).toBe(createExperienceData.organization);
      expect(experience.description).toBe(createExperienceData.description);
      expect(experience.startedAt).toStrictEqual(
        createExperienceData.startedAt,
      );
      expect(experience.endedAt).toBeNull();
      expect(experience.isOngoing).toBe(createExperienceData.isOngoing);
      expect(experience.url).toBe(createExperienceData.url);
      expect(experience.certificationDetail).toBeNull();
      expect(experience.awardDetail).toBeNull();
      expect(experience.languageDetail).toBeNull();
      expect(experience.volunteerDetail).toBeNull();
      expect(experience.medias).toStrictEqual(createExperienceData.medias);
    });
  });
});
