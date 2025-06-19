import { Inject, Injectable } from "~/server/infra/core";
import { CreateProjectUseCase } from "../port/in/project";
import {
  PROJECT_REPOSITORY,
  type ProjectRepository,
} from "../port/out/repositories";
import { CreateProjectDataDto } from "../dto/create-project-data.dto";
import { ProjectDto } from "../dto/project.dto";
import { ProjectMapper } from "../mappers/project";

@Injectable()
export class ProjectService implements CreateProjectUseCase {
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
}
