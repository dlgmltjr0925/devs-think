import "reflect-metadata";

import { container } from "tsyringe";
import { PRISMA_SERVICE, PrismaService } from "../database/prisma.service";
import { PostService } from "~/server/application/services/post.service";
import {
  POST_DRAFT_REPOSITORY,
  POST_REPOSITORY,
  PROJECT_REPOSITORY,
  SKILL_REPOSITORY,
} from "~/server/application/port/out/repositories";
import { PostDraftRepositoryAdapter } from "~/server/adapter/out/persistence/post-draft";
import {
  CREATE_POST_DRAFT_USE_CASE,
  GET_POST_DRAFT_USE_CASE,
  UPDATE_POST_DRAFT_USE_CASE,
  DELETE_POST_DRAFT_USE_CASE,
} from "~/server/application/port/in/post-draft";
import {
  CREATE_POST_USE_CASE,
  DELETE_POST_USE_CASE,
  GET_POST_USE_CASE,
  UPDATE_POST_USE_CASE,
} from "~/server/application/port/in/post";
import {
  CREATE_SKILL_USE_CASE,
  DELETE_SKILL_USE_CASE,
  GET_SKILL_USE_CASE,
  UPDATE_SKILL_USE_CASE,
} from "~/server/application/port/in/skill";
import {
  CREATE_PROJECT_USE_CASE,
  DELETE_PROJECT_USE_CASE,
  GET_PROJECT_USE_CASE,
  UPDATE_PROJECT_USE_CASE,
} from "~/server/application/port/in/project";
import {
  PostDraftService,
  ProjectService,
  SkillService,
} from "~/server/application/services";
import { PostRepositoryAdapter } from "~/server/adapter/out/persistence/post";
import { SkillRepositoryAdapter } from "~/server/adapter/out/persistence/skill";
import { ProjectRepositoryAdapter } from "~/server/adapter/out/persistence/project";

export const di = container;

// Infra Providers
di.registerSingleton(PRISMA_SERVICE, PrismaService);

// Repository Providers
di.registerSingleton(POST_DRAFT_REPOSITORY, PostDraftRepositoryAdapter);
di.registerSingleton(POST_REPOSITORY, PostRepositoryAdapter);
di.registerSingleton(SKILL_REPOSITORY, SkillRepositoryAdapter);
di.registerSingleton(PROJECT_REPOSITORY, ProjectRepositoryAdapter);

// Service Providers
// post draft service
di.registerSingleton(CREATE_POST_DRAFT_USE_CASE, PostDraftService);
di.registerSingleton(GET_POST_DRAFT_USE_CASE, PostDraftService);
di.registerSingleton(UPDATE_POST_DRAFT_USE_CASE, PostDraftService);
di.registerSingleton(DELETE_POST_DRAFT_USE_CASE, PostDraftService);

// post service
di.registerSingleton(CREATE_POST_USE_CASE, PostService);
di.registerSingleton(GET_POST_USE_CASE, PostService);
di.registerSingleton(UPDATE_POST_USE_CASE, PostService);
di.registerSingleton(DELETE_POST_USE_CASE, PostService);

// skill service
di.registerSingleton(CREATE_SKILL_USE_CASE, SkillService);
di.registerSingleton(GET_SKILL_USE_CASE, SkillService);
di.registerSingleton(UPDATE_SKILL_USE_CASE, SkillService);
di.registerSingleton(DELETE_SKILL_USE_CASE, SkillService);

// project service
di.registerSingleton(CREATE_PROJECT_USE_CASE, ProjectService);
di.registerSingleton(GET_PROJECT_USE_CASE, ProjectService);
di.registerSingleton(UPDATE_PROJECT_USE_CASE, ProjectService);
di.registerSingleton(DELETE_PROJECT_USE_CASE, ProjectService);
