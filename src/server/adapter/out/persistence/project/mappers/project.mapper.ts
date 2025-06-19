import { Prisma } from "@prisma/client";
import { Project } from "~/server/domain/aggregate/project";

export class ProjectMapper {
  static toDomain(project: Prisma.ProjectGetPayload<object>): Project {
    return new Project({
      id: project.id,
      userId: project.userId,
      title: project.title,
      description: project.description,
      role: project.role,
      startDate: project.startDate,
      endDate: project.endDate,
      isOngoing: project.isOngoing,
      url: project.url,
      repositoryUrl: project.repositoryUrl,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
      deletedAt: project.deletedAt,
    });
  }
}
