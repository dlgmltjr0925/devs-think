import { beforeAll, describe, expect, it } from "vitest";
import {
  DELETE_PROJECT_USE_CASE,
  DeleteProjectUseCase,
} from "./delete-project.use-case";
import { ProjectTestFeature } from "~/server/application/__mocks__/project";
import { User } from "~/server/domain/aggregate/user";
import { di } from "~/server/infra/di";
import { UserTestFeature } from "~/server/application/__mocks__/user";
import { test } from "~/server/infra/test";
import {
  GET_PROJECT_USE_CASE,
  GetProjectUseCase,
} from "./get-project.use-case";

describe("DeleteProjectUseCase", () => {
  let deleteProjectUseCase: DeleteProjectUseCase;
  let getProjectUseCase: GetProjectUseCase;
  let projectTestFeature: ProjectTestFeature;
  let testUser: User;

  beforeAll(async () => {
    deleteProjectUseCase = di.resolve(DELETE_PROJECT_USE_CASE);

    getProjectUseCase = di.resolve(GET_PROJECT_USE_CASE);

    projectTestFeature = di.resolve(ProjectTestFeature);

    const userTestFeature = di.resolve(UserTestFeature);
    testUser = await userTestFeature.createTestUser();

    return () => {
      userTestFeature.deleteTestUser(testUser.id);
    };
  });

  it("should be defined", () => {
    expect(deleteProjectUseCase).toBeDefined();
  });

  describe("deleteProject", () => {
    test("프로젝트 삭제 성공", async () => {
      // given
      const createdProject = await projectTestFeature.createTestProject(
        testUser.id,
      );

      // when
      await expect(
        deleteProjectUseCase.deleteProject(testUser.id, createdProject.id),
      ).resolves.not.toThrow();
      const deletedProject = await getProjectUseCase.getProject(
        createdProject.id,
      );

      // then
      expect(deletedProject).toBeNull();
    });
  });
});
