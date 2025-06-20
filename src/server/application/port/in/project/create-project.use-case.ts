import { CreateProjectDataDto } from "~/server/application/dto/create-project-data.dto";
import { ProjectDto } from "~/server/application/dto/project.dto";

export const CREATE_PROJECT_USE_CASE = Symbol.for("CreateProjectUseCase");

export interface CreateProjectUseCase {
  createProject(
    userId: number,
    createProjectData: CreateProjectDataDto,
  ): Promise<ProjectDto>;
}
