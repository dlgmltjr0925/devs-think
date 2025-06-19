import { Career } from "~/server/domain/aggregate/career";
import { CareerDto } from "../../dto/career.dto";
import { CareerAchievementMapper } from "./career-archievement.mapper";

export class CareerMapper {
  static toDto(career: Career): CareerDto {
    return {
      id: career.id,
      companyName: career.companyName,
      position: career.position,
      employmentType: career.employmentType,
      locationType: career.locationType,
      location: career.location,
      startDate: career.startDate,
      endDate: career.endDate,
      isCurrentPosition: career.isCurrentPosition,
      description: career.description,
      responsibilities: career.responsibilities,
      url: career.url,
      achievements: career.achievements.map(CareerAchievementMapper.toDto),
      createdAt: career.createdAt,
      updatedAt: career.updatedAt,
    };
  }
}
