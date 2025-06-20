import { CreateProjectDataDto } from "~/server/application/dto/create-project-data.dto";
import { ProjectRepository } from "~/server/application/port/out/repositories";
import { Project } from "~/server/domain/aggregate/project";
import { Inject, Injectable } from "~/server/infra/core";
import { PRISMA_SERVICE, PrismaService } from "~/server/infra/database";
import { ProjectMapper } from "./mappers/project.mapper";
import { UpdateProjectDataDto } from "~/server/application/dto/update-project-data.dto";

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

  async findProjectById(projectId: number): Promise<Project | null> {
    const project = await this.prismaService.project.findUnique({
      where: { id: projectId, deletedAt: null },
    });

    if (!project) {
      return null;
    }

    return ProjectMapper.toDomain(project);
  }

  async findProjectsByUserId(userId: number): Promise<Project[]> {
    const projects = await this.prismaService.project.findMany({
      where: { userId, deletedAt: null },
      orderBy: { startDate: "desc" },
    });

    return projects.map(ProjectMapper.toDomain);
  }

  async updateProject(
    projectId: number,
    updateProjectData: UpdateProjectDataDto,
  ): Promise<Project> {
    const project = await this.prismaService.project.update({
      where: { id: projectId },
      data: {
        title: updateProjectData.title,
        description: updateProjectData.description,
        role: updateProjectData.role,
        startDate: updateProjectData.startDate,
        endDate: updateProjectData.endDate,
        isOngoing: updateProjectData.isOngoing,
        url: updateProjectData.url,
        repositoryUrl: updateProjectData.repositoryUrl,
      },
    });

    return ProjectMapper.toDomain(project);
  }

  async deleteProject(projectId: number): Promise<void> {
    await this.prismaService.project.update({
      where: { id: projectId },
      data: { deletedAt: new Date() },
    });
  }
}
