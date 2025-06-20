import { CreateExperienceDataDto } from "~/server/application/dto/create-experience-data.dto";
import { ExperienceRepository } from "~/server/application/port/out/repositories";
import { Experience } from "~/server/domain/aggregate/experience";
import { Inject, Injectable } from "~/server/infra/core";
import { PRISMA_SERVICE, PrismaService } from "~/server/infra/database";
import { ExperienceMapper } from "./mappers/experience.mapper";

@Injectable()
export class ExperienceRepositoryAdapter implements ExperienceRepository {
  constructor(
    @Inject(PRISMA_SERVICE) private readonly prismaService: PrismaService,
  ) {}

  async createExperience(
    userId: number,
    createExperienceData: CreateExperienceDataDto,
  ): Promise<Experience> {
    const experience = await this.prismaService.client.experience.create({
      data: {
        userId,
        type: createExperienceData.type,
        title: createExperienceData.title,
        organization: createExperienceData.organization,
        description: createExperienceData.description,
        startedAt: createExperienceData.startedAt,
        endedAt: createExperienceData.endedAt,
        isOngoing: createExperienceData.isOngoing,
        url: createExperienceData.url,
        certificationDetail: {
          create: createExperienceData.certificationDetail
            ? {
                certificationNumber:
                  createExperienceData.certificationDetail.certificationNumber,
                issuedBy: createExperienceData.certificationDetail.issuedBy,
                validUntil: createExperienceData.certificationDetail.validUntil,
              }
            : undefined,
        },
        awardDetail: {
          create: createExperienceData.awardDetail
            ? {
                rank: createExperienceData.awardDetail.rank,
                prize: createExperienceData.awardDetail.prize,
                category: createExperienceData.awardDetail.category,
              }
            : undefined,
        },
        languageDetail: {
          create: createExperienceData.languageDetail
            ? {
                language: createExperienceData.languageDetail.language,
                level: createExperienceData.languageDetail.level,
                testType: createExperienceData.languageDetail.testType,
                score: createExperienceData.languageDetail.score,
              }
            : undefined,
        },
        medias: {
          createMany: {
            data: createExperienceData.medias.map((media) => ({
              url: media.url,
              type: media.type,
            })),
          },
        },
        skills: {
          createMany: {
            data: createExperienceData.skillIds.map((skillId) => ({
              skillId,
            })),
          },
        },
      },
      include: this.include,
    });

    return ExperienceMapper.toDomain(experience);
  }

  private get include() {
    return {
      certificationDetail: true,
      awardDetail: true,
      languageDetail: true,
      volunteerDetail: true,
      medias: true,
      skills: true,
    };
  }
}
