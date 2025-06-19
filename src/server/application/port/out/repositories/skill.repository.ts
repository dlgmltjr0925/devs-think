import { CreateSkillDataDto } from "~/server/application/dto/create-skill-data.dto";
import { UpdateSkillDataDto } from "~/server/application/dto/update-skill-data.dto";
import { Skill } from "~/server/domain/entities/skill/skill.entity";

export const SKILL_REPOSITORY = Symbol.for("SkillRepository");

export interface SkillRepository {
  createSkill(
    userId: number,
    createSkillData: CreateSkillDataDto,
  ): Promise<Skill>;
  findSkillById(skillId: number): Promise<Skill | null>;
  findSkillsByUserId(userId: number): Promise<Skill[]>;
  updateSkill(
    skillId: number,
    updateSkillData: UpdateSkillDataDto,
  ): Promise<Skill>;
  deleteSkill(skillId: number): Promise<void>;
}
