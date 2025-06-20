import { Skill } from "~/server/domain/entities/skill";
import { Inject, Injectable } from "~/server/infra/core";
import {
  SKILL_REPOSITORY,
  type SkillRepository,
} from "../../port/out/repositories";
import { mockCreateSkillData } from "./mocks";

@Injectable()
export class SkillTestFeature {
  constructor(
    @Inject(SKILL_REPOSITORY) private readonly skillRepository: SkillRepository,
  ) {}

  async createTestSkill(
    userId: number,
    name: string = mockCreateSkillData.name,
  ): Promise<Skill> {
    return this.skillRepository.createSkill(userId, {
      ...mockCreateSkillData,
      name,
    });
  }
}
