import { CareerDto } from "~/server/application/dto/career.dto";
import { UpdateCareerDataDto } from "~/server/application/dto/update-career-data.dto";

export const UPDATE_CAREER_USE_CASE = Symbol.for("UpdateCareerUseCase");

export interface UpdateCareerUseCase {
  updateCareer(
    userId: number,
    careerId: number,
    updateCareerData: UpdateCareerDataDto,
  ): Promise<CareerDto>;
}
