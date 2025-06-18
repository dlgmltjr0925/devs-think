import "reflect-metadata";

import { container } from "tsyringe";
import { PRISMA_SERVICE, PrismaService } from "../database/prisma.service";
import { PostService } from "~/server/application/services/post.service";
import { WRITE_POST_USE_CASE } from "~/server/application/port/in/post/write-post.use-case";

export const di = container;

// Infra Providers
di.registerSingleton(PRISMA_SERVICE, PrismaService);

// Service Providers
di.registerSingleton(WRITE_POST_USE_CASE, PostService);
