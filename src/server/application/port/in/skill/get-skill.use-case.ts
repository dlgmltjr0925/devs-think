import { SkillDto } from "~/server/application/dto/skill.dto";

export const GET_SKILL_USE_CASE = Symbol.for("GetSkillUseCase");

export interface GetSkillUseCase {
  getSkill(userId: number, skillId: number): Promise<SkillDto | null>;
  getSkillsByUserId(userId: number): Promise<SkillDto[]>;
}
