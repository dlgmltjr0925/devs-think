import { CareerDto } from "~/server/application/dto/career.dto";
import { CreateCareerDataDto } from "~/server/application/dto/create-career-data.dto";

export const CREATE_CAREER_USE_CASE = Symbol.for("CreateCareerUseCase");

export interface CreateCareerUseCase {
  createCareer(
    userId: number,
    createCareerData: CreateCareerDataDto,
  ): Promise<CareerDto>;
}
