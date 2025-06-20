import { beforeAll, describe, expect, it, test } from "vitest";
import {
  UPDATE_EDUCATION_USE_CASE,
  UpdateEducationUseCase,
} from "./update-education.use-case";
import { EducationTestFeature } from "~/server/application/__mocks__/education";
import { User } from "~/server/domain/aggregate/user";
import { di } from "~/server/infra/di";
import { UserTestFeature } from "~/server/application/__mocks__/user";
import { UpdateEducationDataDto } from "~/server/application/dto/update-education-data.dto";
import { SkillTestFeature } from "~/server/application/__mocks__/skill";

describe("UpdateEducationUseCase", () => {
  let updateEducationUseCase: UpdateEducationUseCase;
  let educationTestFeature: EducationTestFeature;
  let skillTestFeature: SkillTestFeature;
  let testUser: User;

  beforeAll(async () => {
    updateEducationUseCase = di.resolve(UPDATE_EDUCATION_USE_CASE);

    educationTestFeature = di.resolve(EducationTestFeature);
    skillTestFeature = di.resolve(SkillTestFeature);

    const userTestFeature = di.resolve(UserTestFeature);
    testUser = await userTestFeature.createTestUser();

    return () => {
      userTestFeature.deleteTestUser(testUser.id);
    };
  });

  it("should be defined", () => {
    expect(updateEducationUseCase).toBeDefined();
  });

  describe("updateEducation", () => {
    test("업데이트 성공", async () => {
      // given
      const skills = await Promise.all([
        skillTestFeature.createTestSkill(testUser.id, "test1"),
        skillTestFeature.createTestSkill(testUser.id, "test2"),
      ]);

      const updateEducationData: UpdateEducationDataDto = {
        schoolName: "updated test",
        degree: "Associate",
        major: "updated test",
        startedAt: new Date(),
        endedAt: new Date(),
        gpa: 4.0,
        activities: "updated test",
        description: "updated test",
        medias: [],
        skillIds: skills.map((skill) => skill.id),
      };

      const createdEducation = await educationTestFeature.createTestEducation(
        testUser.id,
      );

      // when
      const updatedEducation = await updateEducationUseCase.updateEducation(
        testUser.id,
        createdEducation.id,
        updateEducationData,
      );

      // then
      expect(updatedEducation).toBeDefined();
      expect(updatedEducation.id).toBe(createdEducation.id);
      expect(updatedEducation.schoolName).toBe(updateEducationData.schoolName);
      expect(updatedEducation.degree).toBe(updateEducationData.degree);
      expect(updatedEducation.major).toBe(updateEducationData.major);
      expect(updatedEducation.startedAt).toStrictEqual(
        updateEducationData.startedAt,
      );
      expect(updatedEducation.endedAt).toStrictEqual(
        updateEducationData.endedAt,
      );
      expect(updatedEducation.gpa).toBe(updateEducationData.gpa);
      expect(updatedEducation.activities).toBe(updateEducationData.activities);
      expect(updatedEducation.description).toBe(
        updateEducationData.description,
      );
      expect(updatedEducation.medias).toStrictEqual(updateEducationData.medias);
      expect(
        updatedEducation.skills.map((skill) => skill.id).sort(),
      ).toStrictEqual(skills.map((skill) => skill.id).sort());
    });
  });
});
