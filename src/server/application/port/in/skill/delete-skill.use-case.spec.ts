import { beforeAll, describe, expect, it } from "vitest";
import {
  DELETE_SKILL_USE_CASE,
  DeleteSkillUseCase,
} from "./delete-skill.use-case";
import { SkillTestFeature } from "~/server/application/__mocks__/skill";
import { User } from "~/server/domain/user";
import { di } from "~/server/infra/di";
import { test } from "~/server/infra/test";
import { UserTestFeature } from "~/server/application/__mocks__/user";
import { GET_SKILL_USE_CASE, GetSkillUseCase } from "./get-skill.use-case";

describe("DeleteSkillUseCase", () => {
  let deleteSkillUseCase: DeleteSkillUseCase;
  let getSkillUseCase: GetSkillUseCase;
  let skillTestFeature: SkillTestFeature;
  let testUser: User;

  beforeAll(async () => {
    deleteSkillUseCase = di.resolve(DELETE_SKILL_USE_CASE);
    getSkillUseCase = di.resolve(GET_SKILL_USE_CASE);

    skillTestFeature = di.resolve(SkillTestFeature);

    const userTestFeature = di.resolve(UserTestFeature);
    testUser = await userTestFeature.createTestUser();

    return () => {
      userTestFeature.deleteTestUser(testUser.id);
    };
  });

  it("should be defined", () => {
    expect(deleteSkillUseCase).toBeDefined();
  });

  describe("deleteSkill", () => {
    test("should delete a skill", async () => {
      // given
      const createdSkill = await skillTestFeature.createTestSkill(testUser.id);

      // when & then
      await expect(
        deleteSkillUseCase.deleteSkill(testUser.id, createdSkill.id),
      ).resolves.not.toThrowError();
      const deletedSkill = await getSkillUseCase.getSkill(
        testUser.id,
        createdSkill.id,
      );

      // then
      expect(deletedSkill).toBeNull();
    });
  });
});
