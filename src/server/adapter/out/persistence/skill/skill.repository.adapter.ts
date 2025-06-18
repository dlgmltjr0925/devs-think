import { Inject, Injectable } from "~/server/infra/core";
import { SkillRepository } from "~/server/application/port/out/repositories";
import { PRISMA_SERVICE, PrismaService } from "~/server/infra/database";
import { CreateSkillDataDto } from "~/server/application/dto/create-skill-data.dto";
import { Skill } from "~/server/domain/entities/skill";
import { SkillMapper } from "./mappers/skill.mapper";

@Injectable()
export class SkillRepositoryAdapter implements SkillRepository {
  constructor(
    @Inject(PRISMA_SERVICE) private readonly prismaService: PrismaService,
  ) {}

  async createSkill(
    userId: number,
    createSkillData: CreateSkillDataDto,
  ): Promise<Skill> {
    const skill = await this.prismaService.skill.create({
      data: {
        userId,
        name: createSkillData.name,
        description: createSkillData.description,
        category: createSkillData.category,
        level: createSkillData.level,
      },
    });

    return SkillMapper.toDomain(skill);
  }
}
