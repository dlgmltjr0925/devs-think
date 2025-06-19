import { CreateProjectDataDto } from "~/server/application/dto/create-project-data.dto";
import { Project } from "~/server/domain/aggregate/project";

export const PROJECT_REPOSITORY = Symbol.for("ProjectRepository");

export interface ProjectRepository {
  createProject(
    userId: number,
    createProjectData: CreateProjectDataDto,
  ): Promise<Project>;
  findProjectById(projectId: number): Promise<Project | null>;
  findProjectsByUserId(userId: number): Promise<Project[]>;
}
