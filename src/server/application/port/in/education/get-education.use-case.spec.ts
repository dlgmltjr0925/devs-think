import { beforeAll, describe, expect, it, test } from "vitest";
import {
  GET_EDUCATION_USE_CASE,
  GetEducationUseCase,
} from "./get-education.use-case";
import { di } from "~/server/infra/di";
import { User } from "~/server/domain/aggregate/user";
import { UserTestFeature } from "~/server/application/__mocks__/user";
import { EducationTestFeature } from "~/server/application/__mocks__/education";

describe("GetEducationUseCase", () => {
  let getEducationUseCase: GetEducationUseCase;
  let educationTestFeature: EducationTestFeature;
  let testUser: User;

  beforeAll(async () => {
    getEducationUseCase = di.resolve(GET_EDUCATION_USE_CASE);

    educationTestFeature = di.resolve(EducationTestFeature);

    const userTestFeature = di.resolve(UserTestFeature);
    testUser = await userTestFeature.createTestUser();

    return () => {
      userTestFeature.deleteTestUser(testUser.id);
    };
  });

  it("should be defined", () => {
    expect(getEducationUseCase).toBeDefined();
  });

  describe("getEducation", () => {
    test("교육 내역 조회 상공", async () => {
      // given
      const createdEducation = await educationTestFeature.createTestEducation(
        testUser.id,
      );

      // when
      const education = await getEducationUseCase.getEducation(
        createdEducation.id,
      );
      if (!education) {
        throw new Error("Education not found");
      }

      // then
      expect(education).toBeDefined();
      expect(education.id).toBe(createdEducation.id);
      expect(education.schoolName).toBe(createdEducation.schoolName);
      expect(education.degree).toBe(createdEducation.degree);
      expect(education.major).toBe(createdEducation.major);
      expect(education.startedAt).toStrictEqual(createdEducation.startedAt);
      expect(education.endedAt).toStrictEqual(createdEducation.endedAt);
      expect(education.gpa).toBe(createdEducation.gpa);
      expect(education.activities).toBe(createdEducation.activities);
      expect(education.description).toBe(createdEducation.description);
      expect(education.medias.length).toBe(createdEducation.medias.length);
      education.medias.forEach((media) => {
        const matchedMedia = createdEducation.medias.find(
          (m) => m.title === media.title,
        );
        if (!matchedMedia) {
          throw new Error("Media not found");
        }
        expect(matchedMedia.id).toBeDefined();
        expect(matchedMedia.type).toBe(media.type);
        expect(matchedMedia.url).toBe(media.url);
        expect(matchedMedia.title).toBe(media.title);
        expect(matchedMedia.description).toBe(media.description);
      });

      education.skills.forEach((skill) => {
        const skillIds = createdEducation.skillIds.map(
          (skillId) => skillId.value,
        );
        expect(skillIds).toContain(skill.id);
      });
    });
  });

  describe("getEducationsByUserId", () => {
    test("교육 내역 조회 성공", async () => {
      // given
      const createdEducations = await Promise.all([
        educationTestFeature.createTestEducation(testUser.id),
        educationTestFeature.createTestEducation(testUser.id),
      ]);

      // when
      const educations = await getEducationUseCase.getEducationsByUserId(
        testUser.id,
      );

      // then
      expect(educations).toBeDefined();
      expect(educations.length).toBe(createdEducations.length);
      educations.forEach((education) => {
        const matchedEducation = createdEducations.find(
          (e) => e.id === education.id,
        );
        if (!matchedEducation) {
          throw new Error("Education not found");
        }

        expect(
          matchedEducation.skillIds.map((skillId) => skillId.value).sort(),
        ).toStrictEqual(education.skills.map((skill) => skill.id).sort());
      });
    });
  });
});
