export const DELETE_EDUCATION_USE_CASE = Symbol("DeleteEducationUseCase");

export interface DeleteEducationUseCase {
  deleteEducation(userId: number, educationId: number): Promise<void>;
}
