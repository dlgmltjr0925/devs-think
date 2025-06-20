import { beforeAll, describe, expect, it } from "vitest";
import {
  CREATE_PROJECT_USE_CASE,
  CreateProjectUseCase,
} from "./create-project.use-case";
import { User } from "~/server/domain/aggregate/user";
import { di } from "~/server/infra/di";
import { UserTestFeature } from "~/server/application/__mocks__/user";
import { test } from "~/server/infra/test";
import { CreateProjectDataDto } from "~/server/application/dto/create-project-data.dto";

describe("CreateProjectUseCase", () => {
  let createProjectUseCase: CreateProjectUseCase;
  let testUser: User;

  beforeAll(async () => {
    createProjectUseCase = di.resolve(CREATE_PROJECT_USE_CASE);

    const userTestFeature = di.resolve(UserTestFeature);
    testUser = await userTestFeature.createTestUser();

    return () => {
      userTestFeature.deleteTestUser(testUser.id);
    };
  });

  it("should be defined", () => {
    expect(createProjectUseCase).toBeDefined();
  });

  describe("createProject", () => {
    test("should create a project", async () => {
      // given
      const createProjectData: CreateProjectDataDto = {
        title: "Test Project",
        description: "Test Description",
        role: "Test Role",
        startDate: new Date(),
        endDate: new Date(),
        isOngoing: false,
        url: "https://test.com",
        repositoryUrl: "https://test.com",
      };

      // when
      const project = await createProjectUseCase.createProject(
        testUser.id,
        createProjectData,
      );

      expect(project).toBeDefined();
      expect(project.id).toBeDefined();
      expect(project.title).toBe("Test Project");
      expect(project.description).toBe("Test Description");
      expect(project.role).toBe("Test Role");
      expect(project.startDate).toStrictEqual(createProjectData.startDate);
      expect(project.endDate).toStrictEqual(createProjectData.endDate);
      expect(project.isOngoing).toBe(false);
      expect(project.url).toBe("https://test.com");
      expect(project.repositoryUrl).toBe("https://test.com");
      expect(project.createdAt).toBeDefined();
      expect(project.updatedAt).toBeDefined();
    });
  });
});
