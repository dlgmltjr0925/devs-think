import { beforeEach, describe, expect, it } from "vitest";
import {
  WRITE_POST_USE_CASE,
  WritePostUseCase,
} from "~/server/application/port/in/post/write-post.use-case";
import { di } from "~/server/infra/di";

describe("WritePostUseCase", () => {
  let writePostUseCase: WritePostUseCase;

  beforeEach(() => {
    writePostUseCase = di.resolve<WritePostUseCase>(WRITE_POST_USE_CASE);
  });

  it("should be defined", () => {
    expect(writePostUseCase).toBeDefined();
  });
});
