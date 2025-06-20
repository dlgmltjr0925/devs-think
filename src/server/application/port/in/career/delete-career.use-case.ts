export const DELETE_CAREER_USE_CASE = Symbol.for("DeleteCareerUseCase");

export interface DeleteCareerUseCase {
  deleteCareer(userId: number, careerId: number): Promise<void>;
}
