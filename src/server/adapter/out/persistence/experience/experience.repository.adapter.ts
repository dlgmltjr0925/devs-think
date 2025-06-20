import { CreateExperienceDataDto } from "~/server/application/dto/create-experience-data.dto";
import { ExperienceRepository } from "~/server/application/port/out/repositories";
import { Experience } from "~/server/domain/aggregate/experience";
import { Inject, Injectable } from "~/server/infra/core";
import { PRISMA_SERVICE, PrismaService } from "~/server/infra/database";
import { ExperienceMapper } from "./mappers/experience.mapper";
import { UpdateExperienceDataDto } from "~/server/application/dto/update-experience-data.dto";

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
        volunteerDetail: {
          create: createExperienceData.volunteerDetail
            ? {
                hours: createExperienceData.volunteerDetail.hours,
                target: createExperienceData.volunteerDetail.target,
                location: createExperienceData.volunteerDetail.location,
              }
            : undefined,
        },
        medias: {
          createMany: {
            data: createExperienceData.medias.map((media) => ({
              url: media.url,
              type: media.type,
              title: media.title,
              description: media.description,
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

  async findExperienceById(experienceId: number): Promise<Experience | null> {
    const experience = await this.prismaService.client.experience.findUnique({
      where: { id: experienceId, deletedAt: null },
      include: this.include,
    });

    if (!experience) {
      return null;
    }

    return ExperienceMapper.toDomain(experience);
  }

  async findExperiencesByUserId(userId: number): Promise<Experience[]> {
    const experiences = await this.prismaService.client.experience.findMany({
      where: { userId, deletedAt: null },
      include: this.include,
    });

    return experiences.map(ExperienceMapper.toDomain);
  }

  async updateExperience(
    experienceId: number,
    updateExperienceData: UpdateExperienceDataDto,
  ): Promise<Experience> {
    const experience = await this.prismaService.client.experience.findUnique({
      where: { id: experienceId, deletedAt: null },
      include: this.include,
    });

    if (!experience) {
      throw new Error("Experience not found");
    }

    const updatedExperience = await this.prismaService.client.experience.update(
      {
        where: { id: experienceId },
        data: {
          type: updateExperienceData.type,
          title: updateExperienceData.title,
          organization: updateExperienceData.organization,
          description: updateExperienceData.description,
          startedAt: updateExperienceData.startedAt,
          endedAt: updateExperienceData.endedAt,
          isOngoing: updateExperienceData.isOngoing,
          url: updateExperienceData.url,
          certificationDetail: updateExperienceData.certificationDetail
            ? {
                upsert: {
                  create: {
                    certificationNumber:
                      updateExperienceData.certificationDetail
                        .certificationNumber,
                    issuedBy: updateExperienceData.certificationDetail.issuedBy,
                    validUntil:
                      updateExperienceData.certificationDetail.validUntil,
                  },
                  update: {
                    certificationNumber:
                      updateExperienceData.certificationDetail
                        .certificationNumber,
                    issuedBy: updateExperienceData.certificationDetail.issuedBy,
                    validUntil:
                      updateExperienceData.certificationDetail.validUntil,
                  },
                },
              }
            : { delete: !!experience.certificationDetail },
          awardDetail: updateExperienceData.awardDetail
            ? {
                upsert: {
                  create: {
                    rank: updateExperienceData.awardDetail.rank,
                    prize: updateExperienceData.awardDetail.prize,
                    category: updateExperienceData.awardDetail.category,
                  },
                  update: {
                    rank: updateExperienceData.awardDetail.rank,
                    prize: updateExperienceData.awardDetail.prize,
                    category: updateExperienceData.awardDetail.category,
                  },
                },
              }
            : { delete: !!experience.awardDetail },
          languageDetail: updateExperienceData.languageDetail
            ? {
                upsert: {
                  create: {
                    language: updateExperienceData.languageDetail.language,
                    level: updateExperienceData.languageDetail.level,
                    testType: updateExperienceData.languageDetail.testType,
                    score: updateExperienceData.languageDetail.score,
                  },
                  update: {
                    language: updateExperienceData.languageDetail.language,
                    level: updateExperienceData.languageDetail.level,
                    testType: updateExperienceData.languageDetail.testType,
                    score: updateExperienceData.languageDetail.score,
                  },
                },
              }
            : { delete: !!experience.languageDetail },
          volunteerDetail: updateExperienceData.volunteerDetail
            ? {
                upsert: {
                  create: {
                    hours: updateExperienceData.volunteerDetail.hours,
                    target: updateExperienceData.volunteerDetail.target,
                    location: updateExperienceData.volunteerDetail.location,
                  },
                  update: {
                    hours: updateExperienceData.volunteerDetail.hours,
                    target: updateExperienceData.volunteerDetail.target,
                    location: updateExperienceData.volunteerDetail.location,
                  },
                },
              }
            : { delete: !!experience.volunteerDetail },
          medias: {
            deleteMany: {},
            createMany: {
              data: updateExperienceData.medias.map((media) => ({
                url: media.url,
                type: media.type,
                title: media.title,
                description: media.description,
              })),
            },
          },
          skills: {
            deleteMany: {},
            createMany: {
              data: updateExperienceData.skillIds.map((skillId) => ({
                skillId,
              })),
            },
          },
        },
        include: this.include,
      },
    );

    return ExperienceMapper.toDomain(updatedExperience);
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
