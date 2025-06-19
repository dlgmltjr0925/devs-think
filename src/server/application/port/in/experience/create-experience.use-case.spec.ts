import { beforeAll, describe, expect, it } from "vitest";
import {
  CREATE_EXPERIENCE_USE_CASE,
  CreateExperienceUseCase,
} from "./create-experience.use-case";
import { di } from "~/server/infra/di";

describe("CreateExperienceUseCase", () => {
  let createExperienceUseCase: CreateExperienceUseCase;

  beforeAll(async () => {
    createExperienceUseCase = di.resolve(CREATE_EXPERIENCE_USE_CASE);
  });

  it("should be defined", () => {
    expect(createExperienceUseCase).toBeDefined();
  });
});
