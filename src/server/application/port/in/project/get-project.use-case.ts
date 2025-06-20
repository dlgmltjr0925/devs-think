import { ProjectDto } from "~/server/application/dto/project.dto";

export const GET_PROJECT_USE_CASE = Symbol.for("GetProjectUseCase");

export interface GetProjectUseCase {
  getProject(projectId: number): Promise<ProjectDto | null>;
  getProjectsByUserId(userId: number): Promise<ProjectDto[]>;
}
