import { CreateEducationDataDto } from "~/server/application/dto/create-education-data.dto";
import { Education } from "~/server/domain/aggregate/education";

export const EDUCATION_REPOSITORY = Symbol("EducationRepository");

export interface EducationRepository {
  createEducation(
    userId: number,
    createEducationData: CreateEducationDataDto,
  ): Promise<Education>;
}
