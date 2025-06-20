import { CareerDto } from "~/server/application/dto/career.dto";

export const GET_CAREER_USE_CASE = Symbol("GetCareerUseCase");

export interface GetCareerUseCase {
  getCareer(careerId: number): Promise<CareerDto | null>;
  getCareersByUserId(userId: number): Promise<CareerDto[]>;
}
