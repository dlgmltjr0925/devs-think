import { ProjectDto } from "~/server/application/dto/project.dto";
import { UpdateProjectDataDto } from "~/server/application/dto/update-project-data.dto";

export const UPDATE_PROJECT_USE_CASE = Symbol.for("UpdateProjectUseCase");

export interface UpdateProjectUseCase {
  updateProject(
    userId: number,
    projectId: number,
    updateProjectData: UpdateProjectDataDto,
  ): Promise<ProjectDto>;
}
