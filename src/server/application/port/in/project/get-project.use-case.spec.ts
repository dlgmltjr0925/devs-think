import { beforeAll, describe, expect, it, test } from "vitest";
import {
  GET_PROJECT_USE_CASE,
  GetProjectUseCase,
} from "./get-project.use-case";
import { di } from "~/server/infra/di";
import { User } from "~/server/domain/aggregate/user";
import { UserTestFeature } from "~/server/application/__mocks__/user";
import { ProjectTestFeature } from "~/server/application/__mocks__/project";

describe("GetProjectUseCase", () => {
  let getProjectUseCase: GetProjectUseCase;
  let projectTestFeature: ProjectTestFeature;
  let testUser: User;

  beforeAll(async () => {
    getProjectUseCase = di.resolve(GET_PROJECT_USE_CASE);

    projectTestFeature = di.resolve(ProjectTestFeature);

    const userTestFeature = di.resolve(UserTestFeature);
    testUser = await userTestFeature.createTestUser();

    return () => {
      userTestFeature.deleteTestUser(testUser.id);
    };
  });

  it("should be defined", () => {
    expect(getProjectUseCase).toBeDefined();
  });

  describe("getProject", () => {
    test("프로젝트 조회 성공", async () => {
      // given
      const createdProject = await projectTestFeature.createTestProject(
        testUser.id,
      );

      // when
      const project = await getProjectUseCase.getProject(createdProject.id);

      if (!project) {
        throw new Error("Project not found");
      }

      // then
      expect(project).toBeDefined();
      expect(project.id).toBe(createdProject.id);
      expect(project.title).toBe(createdProject.title);
      expect(project.description).toBe(createdProject.description);
      expect(project.role).toBe(createdProject.role);
      expect(project.startDate).toStrictEqual(createdProject.startDate);
      expect(project.endDate).toStrictEqual(createdProject.endDate);
      expect(project.isOngoing).toBe(createdProject.isOngoing);
      expect(project.url).toBe(createdProject.url);
      expect(project.repositoryUrl).toBe(createdProject.repositoryUrl);
      expect(project.createdAt).toBeDefined();
      expect(project.updatedAt).toBeDefined();
    });

    test("잘못된 아이디 조회시 Null 반환", async () => {
      // given
      const wrongProjectId = 0;

      // when
      const project = await getProjectUseCase.getProject(wrongProjectId);

      // then
      expect(project).toBeNull();
    });
  });

  describe("getProjectsByUserId", () => {
    test("유저 아이디로 프로젝트 리스트 조회 성공", async () => {
      // given
      await Promise.all(
        Array.from({ length: 3 }).map(async () => {
          return projectTestFeature.createTestProject(testUser.id);
        }),
      );

      // when
      const projects = await getProjectUseCase.getProjectsByUserId(testUser.id);

      // then
      expect(projects).toBeDefined();
      expect(projects.length).toBe(3);
    });
  });
});
