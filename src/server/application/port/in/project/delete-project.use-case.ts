export const DELETE_PROJECT_USE_CASE = Symbol.for("DeleteProjectUseCase");

export interface DeleteProjectUseCase {
  deleteProject(userId: number, projectId: number): Promise<void>;
}
