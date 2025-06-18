import { CreateSkillDataDto } from "~/server/application/dto/create-skill-data.dto";
import { Skill } from "~/server/domain/entities/skill/skill.entity";

export const SKILL_REPOSITORY = Symbol.for("SkillRepository");

export interface SkillRepository {
  createSkill(
    userId: number,
    createSkillData: CreateSkillDataDto,
  ): Promise<Skill>;
}
