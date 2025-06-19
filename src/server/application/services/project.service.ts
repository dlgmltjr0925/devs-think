import { Inject, Injectable } from "~/server/infra/core";
import {
  CreateProjectUseCase,
  DeleteProjectUseCase,
  GetProjectUseCase,
  UpdateProjectUseCase,
} from "../port/in/project";
import {
  PROJECT_REPOSITORY,
  type ProjectRepository,
} from "../port/out/repositories";
import { CreateProjectDataDto } from "../dto/create-project-data.dto";
import { ProjectDto } from "../dto/project.dto";
import { ProjectMapper } from "../mappers/project";
import { UpdateProjectDataDto } from "../dto/update-project-data.dto";
import { NotFoundError } from "~/shared/error/not-found.error";
import { ForbiddenError } from "~/shared/error";

@Injectable()
export class ProjectService
  implements
    CreateProjectUseCase,
    GetProjectUseCase,
    UpdateProjectUseCase,
    DeleteProjectUseCase
{
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: ProjectRepository,
  ) {}

  async createProject(
    userId: number,
    createProjectData: CreateProjectDataDto,
  ): Promise<ProjectDto> {
    const project = await this.projectRepository.createProject(
      userId,
      createProjectData,
    );

    return ProjectMapper.toDto(project);
  }

  async getProject(projectId: number): Promise<ProjectDto | null> {
    const project = await this.projectRepository.findProjectById(projectId);

    if (!project) {
      return null;
    }

    return ProjectMapper.toDto(project);
  }

  async getProjectsByUserId(userId: number): Promise<ProjectDto[]> {
    const projects = await this.projectRepository.findProjectsByUserId(userId);

    return projects.map(ProjectMapper.toDto);
  }

  async updateProject(
    userId: number,
    projectId: number,
    updateProjectData: UpdateProjectDataDto,
  ): Promise<ProjectDto> {
    const project = await this.projectRepository.findProjectById(projectId);

    if (!project) {
      throw new NotFoundError();
    }

    if (project.userId !== userId) {
      throw new ForbiddenError();
    }

    const updatedProject = await this.projectRepository.updateProject(
      projectId,
      updateProjectData,
    );

    return ProjectMapper.toDto(updatedProject);
  }

  async deleteProject(userId: number, projectId: number): Promise<void> {
    const project = await this.projectRepository.findProjectById(projectId);

    if (!project) {
      throw new NotFoundError();
    }

    if (project.userId !== userId) {
      throw new ForbiddenError();
    }

    await this.projectRepository.deleteProject(projectId);
  }
}
