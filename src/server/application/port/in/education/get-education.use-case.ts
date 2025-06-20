import { EducationDto } from "~/server/application/dto/education.dto";

export const GET_EDUCATION_USE_CASE = Symbol("GetEducationUseCase");

export interface GetEducationUseCase {
  getEducation(educationId: number): Promise<EducationDto | null>;
  getEducationsByUserId(userId: number): Promise<EducationDto[]>;
}
