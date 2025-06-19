import { CreateCareerDataDto } from "~/server/application/dto/create-career-data.dto";
import { UpdateCareerDataDto } from "~/server/application/dto/update-career-data.dto";
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
    const career = await this.prismaService.client.career.create({
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

  async findCareerById(careerId: number): Promise<Career | null> {
    const career = await this.prismaService.client.career.findFirst({
      where: {
        id: careerId,
        deletedAt: null,
      },
      include: {
        achievements: true,
      },
    });

    if (!career) {
      return null;
    }

    return CareerMapper.toDomain(career);
  }

  async findCareersByUserId(userId: number): Promise<Career[]> {
    const careers = await this.prismaService.career.findMany({
      where: {
        userId,
        deletedAt: null,
      },
      include: {
        achievements: true,
      },
    });

    return careers.map(CareerMapper.toDomain);
  }

  async updateCareer(
    careerId: number,
    updateCareerData: UpdateCareerDataDto,
  ): Promise<Career> {
    // career achievements 삭제 처리
    await this.prismaService.client.careerAchievement.updateMany({
      where: {
        id: {
          notIn: updateCareerData.achievements
            .filter((achievement) => achievement.id !== null)
            .map((achievement) => achievement.id as number),
        },
      },
      data: {
        deletedAt: new Date(),
      },
    });

    // career achievements 업데이트 처리
    await Promise.all(
      updateCareerData.achievements
        .filter((achievement) => achievement.id !== null)
        .map((achievement) =>
          this.prismaService.client.careerAchievement.update({
            where: { id: achievement.id as number },
            data: {
              description: achievement.description,
              metrics: achievement.metrics,
            },
          }),
        ),
    );

    // career 업데이트 처리
    const updatedCareer = await this.prismaService.client.career.update({
      where: {
        id: careerId,
      },
      data: {
        companyName: updateCareerData.companyName,
        position: updateCareerData.position,
        employmentType: updateCareerData.employmentType,
        locationType: updateCareerData.locationType,
        location: updateCareerData.location,
        startDate: updateCareerData.startDate,
        endDate: updateCareerData.endDate,
        isCurrentPosition: updateCareerData.isCurrentPosition,
        description: updateCareerData.description,
        responsibilities: updateCareerData.responsibilities,
        url: updateCareerData.url,
        achievements: {
          createMany: {
            data: updateCareerData.achievements
              .filter((achievement) => achievement.id === null)
              .map((achievement) => ({
                description: achievement.description,
                metrics: achievement.metrics,
              })),
          },
        },
      },
      include: {
        achievements: true,
      },
    });

    return CareerMapper.toDomain(updatedCareer);
  }
}
