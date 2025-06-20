import { CreateEducationDataDto } from "~/server/application/dto/create-education-data.dto";
import { EducationRepository } from "~/server/application/port/out/repositories/education.repository";
import { Education } from "~/server/domain/aggregate/education";
import { Inject, Injectable } from "~/server/infra/core";
import { PRISMA_SERVICE, PrismaService } from "~/server/infra/database";
import { EducationMapper } from "./mappers/education.mapper";

@Injectable()
export class EducationRepositoryAdapter implements EducationRepository {
  constructor(
    @Inject(PRISMA_SERVICE)
    private readonly prismaService: PrismaService,
  ) {}

  async createEducation(
    userId: number,
    createEducationData: CreateEducationDataDto,
  ): Promise<Education> {
    const education = await this.prismaService.education.create({
      data: {
        userId,
        schoolName: createEducationData.schoolName,
        degree: createEducationData.degree,
        major: createEducationData.major,
        startedAt: createEducationData.startedAt,
        endedAt: createEducationData.endedAt,
        gpa: createEducationData.gpa,
        activities: createEducationData.activities,
        description: createEducationData.description,
        medias: {
          create: createEducationData.medias.map((media) => ({
            url: media.url,
            type: media.type,
            title: media.title,
            description: media.description,
          })),
        },
        skills: {
          createMany: {
            data: createEducationData.skillIds.map((skillId) => ({
              skillId,
            })),
          },
        },
      },
      include: this.include,
    });

    return EducationMapper.toDomain(education);
  }

  async findEducationById(educationId: number): Promise<Education | null> {
    const education = await this.prismaService.education.findUnique({
      where: { id: educationId, deletedAt: null },
      include: this.include,
    });

    if (!education) {
      return null;
    }

    return EducationMapper.toDomain(education);
  }

  async findEducationsByUserId(userId: number): Promise<Education[]> {
    const educations = await this.prismaService.education.findMany({
      where: { userId, deletedAt: null },
      include: this.include,
    });

    return educations.map(EducationMapper.toDomain);
  }

  private get include() {
    return {
      medias: true,
      skills: true,
    };
  }
}
