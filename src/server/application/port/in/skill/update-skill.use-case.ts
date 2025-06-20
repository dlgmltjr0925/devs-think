import { SkillDto } from "~/server/application/dto/skill.dto";
import { UpdateSkillDataDto } from "~/server/application/dto/update-skill-data.dto";

export const UPDATE_SKILL_USE_CASE = "UpdateSkillUseCase";

export interface UpdateSkillUseCase {
  updateSkill(
    userId: number,
    skillId: number,
    updateSkillData: UpdateSkillDataDto,
  ): Promise<SkillDto>;
}
