import { beforeAll, describe, expect, it } from "vitest";
import { GET_SKILL_USE_CASE, GetSkillUseCase } from "./get-skill.use-case";
import { di } from "~/server/infra/di";
import { test } from "~/server/infra/test";
import { User } from "~/server/domain/user";
import { UserTestFeature } from "~/server/application/__mocks__/user";
import { SkillTestFeature } from "~/server/application/__mocks__/skill";

describe("GetSkillUseCase", () => {
  let getSkillUseCase: GetSkillUseCase;
  let skillTestFeature: SkillTestFeature;
  let testUser: User;

  beforeAll(async () => {
    getSkillUseCase = di.resolve(GET_SKILL_USE_CASE);

    skillTestFeature = di.resolve(SkillTestFeature);

    const userTestFeature = di.resolve(UserTestFeature);
    testUser = await userTestFeature.createTestUser();

    return () => {
      userTestFeature.deleteTestUser(testUser.id);
    };
  });

  it("should be defined", () => {
    expect(getSkillUseCase).toBeDefined();
  });

  describe("getSkill", () => {
    test("사용자가 가지고 있는 기술을 조회할 수 있다.", async () => {
      // given
      const skill = await skillTestFeature.createTestSkill(testUser.id);

      // when
      const result = await getSkillUseCase.getSkill(testUser.id, skill.id);

      if (!result) {
        throw new Error("Skill not found");
      }

      // then
      expect(result).toBeDefined();
      expect(result.id).toBe(skill.id);
      expect(result.name).toBe(skill.name);
      expect(result.description).toBe(skill.description);
      expect(result.category).toBe(skill.category);
      expect(result.level).toBe(skill.level);
      expect(result.createdAt).toBeDefined();
      expect(result.updatedAt).toBeDefined();
      expect(result.deletedAt).toBeNull();
    });
  });

  describe("getSkillsByUserId", () => {
    test("사용자가 가지고 있는 모든 기술을 조회할 수 있다.", async () => {
      // given
      await skillTestFeature.createTestSkill(testUser.id);
      await skillTestFeature.createTestSkill(testUser.id, "Test Skill 2");

      const skills = await getSkillUseCase.getSkillsByUserId(testUser.id);

      // then
      expect(skills).toBeDefined();
      expect(skills.length).toBe(2);

      skills.forEach((skill) => {
        expect(skill.id).toBeDefined();
        expect(skill.name).toBeDefined();
        expect(skill.description).toBeDefined();
        expect(skill.category).toBeDefined();
        expect(skill.level).toBeDefined();
        expect(skill.createdAt).toBeDefined();
        expect(skill.updatedAt).toBeDefined();
        expect(skill.deletedAt).toBeNull();
      });
    });
  });
});
