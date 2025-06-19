import { CreateProjectDataDto } from "~/server/application/dto/create-project-data.dto";
import { ProjectRepository } from "~/server/application/port/out/repositories";
import { Project } from "~/server/domain/aggregate/project";
import { Inject, Injectable } from "~/server/infra/core";
import { PRISMA_SERVICE, PrismaService } from "~/server/infra/database";
import { ProjectMapper } from "./mappers/project.mapper";

@Injectable()
export class ProjectRepositoryAdapter implements ProjectRepository {
  constructor(
    @Inject(PRISMA_SERVICE) private readonly prismaService: PrismaService,
  ) {}

  async createProject(
    userId: number,
    createProjectData: CreateProjectDataDto,
  ): Promise<Project> {
    const project = await this.prismaService.project.create({
      data: {
        userId,
        title: createProjectData.title,
        description: createProjectData.description,
        role: createProjectData.role,
        startDate: createProjectData.startDate,
        endDate: createProjectData.endDate,
        isOngoing: createProjectData.isOngoing,
        url: createProjectData.url,
        repositoryUrl: createProjectData.repositoryUrl,
      },
    });

    return ProjectMapper.toDomain(project);
  }
}
