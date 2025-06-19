import { beforeAll, describe, expect, it } from "vitest";
import {
  CREATE_SKILL_USE_CASE,
  CreateSkillUseCase,
} from "./create-skill.use-case";
import { di } from "~/server/infra/di";
import { test } from "~/server/infra/test";
import { User } from "~/server/domain/aggregate/user";
import { UserTestFeature } from "~/server/application/__mocks__/user";
import { CreateSkillDataDto } from "~/server/application/dto/create-skill-data.dto";

describe("CreateSkillUseCase", () => {
  let createSkillUseCase: CreateSkillUseCase;
  let testUser: User;

  beforeAll(async () => {
    createSkillUseCase = di.resolve(CREATE_SKILL_USE_CASE);

    const userTestFeature = di.resolve(UserTestFeature);
    testUser = await userTestFeature.createTestUser();

    return () => {
      userTestFeature.deleteTestUser(testUser.id);
    };
  });

  it("should be defined", () => {
    expect(createSkillUseCase).toBeDefined();
  });

  describe("createSkill", () => {
    test("should create a skill", async () => {
      // given
      const createSkillData: CreateSkillDataDto = {
        name: "Test Skill",
        description: "Test Description",
        category: "Language",
        level: "Beginner",
      };

      const skill = await createSkillUseCase.createSkill(
        testUser.id,
        createSkillData,
      );

      // then
      expect(skill).toBeDefined();
      expect(skill.name).toBe(createSkillData.name);
      expect(skill.description).toBe(createSkillData.description);
      expect(skill.category).toBe(createSkillData.category);
      expect(skill.level).toBe(createSkillData.level);
      expect(skill.createdAt).toBeDefined();
      expect(skill.updatedAt).toBeDefined();
      expect(skill.deletedAt).toBeNull();
    });
  });
});
