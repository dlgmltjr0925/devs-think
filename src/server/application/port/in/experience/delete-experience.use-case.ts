export const DELETE_EXPERIENCE_USE_CASE = Symbol.for("DeleteExperienceUseCase");

export interface DeleteExperienceUseCase {
  deleteExperience(userId: number, experienceId: number): Promise<void>;
}
