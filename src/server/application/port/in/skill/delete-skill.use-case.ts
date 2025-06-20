export const DELETE_SKILL_USE_CASE = Symbol.for("DeleteSkillUseCase");

export interface DeleteSkillUseCase {
  deleteSkill(userId: number, skillId: number): Promise<void>;
}
