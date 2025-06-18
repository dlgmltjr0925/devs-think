import { SkillDto } from "~/server/application/dto/skill.dto";

export const GET_SKILL_USE_CASE = Symbol.for("GetSkillUseCase");

export interface GetSkillUseCase {
  getSkillsByUserId(userId: number): Promise<SkillDto[]>;
}
