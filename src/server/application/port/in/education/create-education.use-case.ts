import { CreateEducationDataDto } from "~/server/application/dto/create-education-data.dto";
import { EducationDto } from "~/server/application/dto/education.dto";

export const CREATE_EDUCATION_USE_CASE = Symbol("CreateEducationUseCase");

export interface CreateEducationUseCase {
  createEducation(
    userId: number,
    createEducationData: CreateEducationDataDto,
  ): Promise<EducationDto>;
}
