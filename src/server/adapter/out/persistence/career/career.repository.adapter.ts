import { CreateCareerDataDto } from "~/server/application/dto/create-career-data.dto";
import { CareerRepository } from "~/server/application/port/out/repositories";
import { Career } from "~/server/domain/aggregate/career";
import { Inject, Injectable } from "~/server/infra/core";
import { PRISMA_SERVICE, PrismaService } from "~/server/infra/database";
import { CareerMapper } from "./mappers/career.mapper";

@Injectable()
export class CareerRepositoryAdapter implements CareerRepository {
  constructor(
    @Inject(PRISMA_SERVICE)
    private readonly prismaService: PrismaService,
  ) {}

  async createCareer(
    userId: number,
    createCareerData: CreateCareerDataDto,
  ): Promise<Career> {
    const career = await this.prismaService.career.create({
      data: {
        userId,
        companyName: createCareerData.companyName,
        position: createCareerData.position,
        employmentType: createCareerData.employmentType,
        locationType: createCareerData.locationType,
        location: createCareerData.location,
        startDate: createCareerData.startDate,
        endDate: createCareerData.endDate,
        isCurrentPosition: createCareerData.isCurrentPosition,
        description: createCareerData.description,
        responsibilities: createCareerData.responsibilities,
        url: createCareerData.url,
        achievements: {
          create: createCareerData.achievements.map((achievement) => ({
            description: achievement.description,
            metrics: achievement.metrics,
          })),
        },
      },
      include: {
        achievements: true,
      },
    });

    return CareerMapper.toDomain(career);
  }
}
