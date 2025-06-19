import { Project } from "~/server/domain/aggregate/project";
import { ProjectDto } from "../../dto/project.dto";

export class ProjectMapper {
  static toDto(project: Project): ProjectDto {
    return {
      id: project.id,
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
    };
  }
}
