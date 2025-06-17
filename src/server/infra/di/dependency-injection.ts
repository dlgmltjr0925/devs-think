import "reflect-metadata";

import { container } from "tsyringe";
import { PRISMA_SERVICE, PrismaService } from "../database/prisma.service";

export const di = container;

// Infra Providers
di.registerSingleton(PRISMA_SERVICE, PrismaService);
