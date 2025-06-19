import { CareerAchievement } from "~/server/domain/aggregate/career/career-archievement.entity";
import { CareerAchievementDto } from "../../dto/career-archievement.dto";

export class CareerAchievementMapper {
  static toDto(careerAchievement: CareerAchievement): CareerAchievementDto {
    return {
      id: careerAchievement.id,
      careerId: careerAchievement.careerId,
      description: careerAchievement.description,
      metrics: careerAchievement.metrics,
      createdAt: careerAchievement.createdAt,
      updatedAt: careerAchievement.updatedAt,
    };
  }
}
