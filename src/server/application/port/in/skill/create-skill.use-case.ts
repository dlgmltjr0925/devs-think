import { CreateSkillDataDto } from "~/server/application/dto/create-skill-data.dto";
import { SkillDto } from "~/server/application/dto/skill.dto";

export const CREATE_SKILL_USE_CASE = Symbol.for("CreateSkillUseCase");

export interface CreateSkillUseCase {
  createSkill(
    userId: number,
    createSkillData: CreateSkillDataDto,
  ): Promise<SkillDto>;
}
