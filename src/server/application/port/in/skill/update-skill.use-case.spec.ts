import { beforeAll, describe, expect, it, test } from "vitest";
import {
  UPDATE_SKILL_USE_CASE,
  UpdateSkillUseCase,
} from "./update-skill.use-case";
import { SkillTestFeature } from "~/server/application/__mocks__/skill";
import { User } from "~/server/domain/aggregate/user";
import { di } from "~/server/infra/di";
import { UserTestFeature } from "~/server/application/__mocks__/user";
import { UpdateSkillDataDto } from "~/server/application/dto/update-skill-data.dto";

describe("UpdateSkillUseCase", () => {
  let updateSkillUseCase: UpdateSkillUseCase;
  let skillTestFeature: SkillTestFeature;
  let testUser: User;

  beforeAll(async () => {
    updateSkillUseCase = di.resolve(UPDATE_SKILL_USE_CASE);

    skillTestFeature = di.resolve(SkillTestFeature);

    const userTestFeature = di.resolve(UserTestFeature);
    testUser = await userTestFeature.createTestUser();

    return () => {
      userTestFeature.deleteTestUser(testUser.id);
    };
  });

  it("should be defined", () => {
    expect(updateSkillUseCase).toBeDefined();
  });

  describe("updateSkill", () => {
    test("should update a skill", async () => {
      // given
      const updateSkillData: UpdateSkillDataDto = {
        name: "updated name",
        description: "updated description",
        category: "Framework",
        level: "Intermediate",
      };
      const createdSkill = await skillTestFeature.createTestSkill(testUser.id);

      // when
      const updatedSkill = await updateSkillUseCase.updateSkill(
        testUser.id,
        createdSkill.id,
        updateSkillData,
      );

      // then
      expect(updatedSkill).toBeDefined();
      expect(updatedSkill.name).toBe(updateSkillData.name);
      expect(updatedSkill.description).toBe(updateSkillData.description);
      expect(updatedSkill.category).toBe(updateSkillData.category);
      expect(updatedSkill.level).toBe(updateSkillData.level);
      expect(updatedSkill.createdAt).toStrictEqual(createdSkill.createdAt);
      expect(updatedSkill.updatedAt).not.toStrictEqual(createdSkill.updatedAt);
      expect(updatedSkill.deletedAt).toBeNull();
    });
  });
});
