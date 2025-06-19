import { ExperienceRepository } from "~/server/application/port/out/repositories";
import { Inject, Injectable } from "~/server/infra/core";
import { PRISMA_SERVICE, PrismaService } from "~/server/infra/database";

@Injectable()
export class ExperienceRepositoryAdapter implements ExperienceRepository {
  constructor(
    @Inject(PRISMA_SERVICE) private readonly prismaService: PrismaService,
  ) {}
}
