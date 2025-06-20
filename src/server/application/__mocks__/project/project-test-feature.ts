import { Inject, Injectable } from "~/server/infra/core";
import {
  PROJECT_REPOSITORY,
  type ProjectRepository,
} from "../../port/out/repositories";
import { Project } from "~/server/domain/aggregate/project";
import { mockCreateProjectData } from "./mocks";

@Injectable()
export class ProjectTestFeature {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: ProjectRepository,
  ) {}

  async createTestProject(userId: number): Promise<Project> {
    return this.projectRepository.createProject(userId, mockCreateProjectData);
  }
}
