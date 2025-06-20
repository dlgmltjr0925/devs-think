import { beforeAll, describe, expect, it } from "vitest";
import {
  CREATE_EDUCATION_USE_CASE,
  CreateEducationUseCase,
} from "./create-education.use-case";
import { di } from "~/server/infra/di";
import { test } from "~/server/infra/test";
import { User } from "~/server/domain/aggregate/user";
import { UserTestFeature } from "~/server/application/__mocks__/user";
import { CreateEducationDataDto } from "~/server/application/dto/create-education-data.dto";
import { SkillTestFeature } from "~/server/application/__mocks__/skill";

describe("CreateEducationUseCase", () => {
  let createEducationUseCase: CreateEducationUseCase;
  let skillTestFeature: SkillTestFeature;
  let testUser: User;

  beforeAll(async () => {
    createEducationUseCase = di.resolve(CREATE_EDUCATION_USE_CASE);

    skillTestFeature = di.resolve(SkillTestFeature);

    const userTestFeature = di.resolve(UserTestFeature);
    testUser = await userTestFeature.createTestUser();

    return () => {
      userTestFeature.deleteTestUser(testUser.id);
    };
  });

  it("should be defined", () => {
    expect(createEducationUseCase).toBeDefined();
  });

  describe("createEducation", () => {
    test("학력 정보 생성 성공", async () => {
      const skills = await Promise.all([
        skillTestFeature.createTestSkill(testUser.id, "Skill 1"),
        skillTestFeature.createTestSkill(testUser.id, "Skill 2"),
      ]);

      const createEducationData: CreateEducationDataDto = {
        schoolName: "Test School",
        degree: "Associate",
        major: "Test Major",
        startedAt: new Date(),
        endedAt: new Date(),
        gpa: 4.0,
        activities: "Test Activities",
        description: "Test Description",
        medias: [
          {
            type: "Image",
            url: "https://example.com/image.jpg",
            title: "Image Title",
            description: "Image Description",
          },
        ],
        skillIds: skills.map((skill) => skill.id),
      };

      const education = await createEducationUseCase.createEducation(
        testUser.id,
        createEducationData,
      );

      expect(education).toBeDefined();
      expect(education.id).toBeDefined();
      expect(education.schoolName).toBe(createEducationData.schoolName);
      expect(education.degree).toBe(createEducationData.degree);
      expect(education.major).toBe(createEducationData.major);
      expect(education.startedAt).toStrictEqual(createEducationData.startedAt);
      expect(education.endedAt).toStrictEqual(createEducationData.endedAt);
      expect(education.gpa).toBe(createEducationData.gpa);
      expect(education.activities).toBe(createEducationData.activities);
      expect(education.description).toBe(createEducationData.description);
      education.medias.forEach((media) => {
        const matchedMedia = createEducationData.medias.find(
          (m) => m.url === media.url,
        );
        if (!matchedMedia) {
          throw new Error("matchedMedia not found");
        }
        expect(matchedMedia).toBeDefined();
        expect(matchedMedia.type).toBe(media.type);
        expect(matchedMedia.title).toBe(media.title);
        expect(matchedMedia.description).toBe(media.description);
      });

      expect(education.skills.map((skill) => skill.id).sort()).toStrictEqual(
        createEducationData.skillIds.sort(),
      );
    });
  });
});
