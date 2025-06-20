import { Prisma } from "@prisma/client";
import { CareerAchievement } from "~/server/domain/aggregate/career/career-archievement.entity";

export class CareerAchievementMapper {
  static toDomain(
    careerAchievement: Prisma.CareerAchievementGetPayload<object>,
  ): CareerAchievement {
    return new CareerAchievement({
      id: careerAchievement.id,
      careerId: careerAchievement.careerId,
      description: careerAchievement.description,
      metrics: careerAchievement.metrics,
      createdAt: careerAchievement.createdAt,
      updatedAt: careerAchievement.updatedAt,
      deletedAt: careerAchievement.deletedAt,
    });
  }
}
