import { Prisma } from "@prisma/client";
import { Career } from "~/server/domain/aggregate/career";
import { EmploymentType } from "~/server/domain/aggregate/career/employment-type.entity";
import { LocationType } from "~/server/domain/aggregate/career/location-type.entity";
import { CareerAchievementMapper } from "./career-archievement.mapper";

type PrismaCareer = Prisma.CareerGetPayload<{
  include: {
    achievements: true;
  };
}>;

export class CareerMapper {
  static toDomain(career: PrismaCareer): Career {
    return new Career({
      id: career.id,
      userId: career.userId,
      companyName: career.companyName,
      position: career.position,
      employmentType: EmploymentType[career.employmentType],
      locationType: LocationType[career.locationType],
      location: career.location,
      startDate: career.startDate,
      endDate: career.endDate,
      isCurrentPosition: career.isCurrentPosition,
      description: career.description,
      responsibilities: career.responsibilities,
      url: career.url,
      createdAt: career.createdAt,
      updatedAt: career.updatedAt,
      deletedAt: career.deletedAt,
      achievements: career.achievements.map(CareerAchievementMapper.toDomain),
    });
  }
}
