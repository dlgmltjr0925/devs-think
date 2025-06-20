import { CreateCareerDataDto } from "~/server/application/dto/create-career-data.dto";
import { UpdateCareerDataDto } from "~/server/application/dto/update-career-data.dto";
import { Career } from "~/server/domain/aggregate/career/career.entity";

export const CAREER_REPOSITORY = Symbol.for("CareerRepository");

export interface CareerRepository {
  createCareer(
    userId: number,
    createCareerData: CreateCareerDataDto,
  ): Promise<Career>;
  findCareerById(careerId: number): Promise<Career | null>;
  findCareersByUserId(userId: number): Promise<Career[]>;
  updateCareer(
    careerId: number,
    updateCareerData: UpdateCareerDataDto,
  ): Promise<Career>;
  deleteCareer(careerId: number): Promise<void>;
}
