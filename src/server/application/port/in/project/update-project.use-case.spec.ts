import { beforeAll, describe, expect, it, test } from "vitest";
import {
  UPDATE_PROJECT_USE_CASE,
  UpdateProjectUseCase,
} from "./update-project.use-case";
import { ProjectTestFeature } from "~/server/application/__mocks__/project";
import { User } from "~/server/domain/aggregate/user";
import { di } from "~/server/infra/di";
import { UserTestFeature } from "~/server/application/__mocks__/user";
import { UpdateProjectDataDto } from "~/server/application/dto/update-project-data.dto";

describe("UpdateProjectUseCase", () => {
  let updateProjectUseCase: UpdateProjectUseCase;
  let projectTestFeature: ProjectTestFeature;
  let testUser: User;

  beforeAll(async () => {
    updateProjectUseCase = di.resolve(UPDATE_PROJECT_USE_CASE);

    projectTestFeature = di.resolve(ProjectTestFeature);

    const userTestFeature = di.resolve(UserTestFeature);
    testUser = await userTestFeature.createTestUser();

    return () => {
      userTestFeature.deleteTestUser(testUser.id);
    };
  });

  it("should be defined", () => {
    expect(updateProjectUseCase).toBeDefined();
  });

  describe("updateProject", () => {
    test("프로젝트 업데이트 성공", async () => {
      // given
      const updateProjectData: UpdateProjectDataDto = {
        title: "Updated Project",
        description: "Updated Description",
        role: "Updated Role",
        startDate: new Date(),
        endDate: new Date(),
        isOngoing: false,
        url: "https://www.google.com",
        repositoryUrl: "https://www.github.com",
      };
      const createdProject = await projectTestFeature.createTestProject(
        testUser.id,
      );

      // when
      const updatedProject = await updateProjectUseCase.updateProject(
        testUser.id,
        createdProject.id,
        updateProjectData,
      );

      // then
      expect(updatedProject).toBeDefined();
      expect(updatedProject.id).toBe(createdProject.id);
      expect(updatedProject.title).toBe(updateProjectData.title);
      expect(updatedProject.description).toBe(updateProjectData.description);
      expect(updatedProject.role).toBe(updateProjectData.role);
      expect(updatedProject.startDate).toStrictEqual(
        updateProjectData.startDate,
      );
      expect(updatedProject.endDate).toStrictEqual(updateProjectData.endDate);
      expect(updatedProject.isOngoing).toBe(updateProjectData.isOngoing);
      expect(updatedProject.url).toBe(updateProjectData.url);
      expect(updatedProject.repositoryUrl).toBe(
        updateProjectData.repositoryUrl,
      );
    });
  });
});
