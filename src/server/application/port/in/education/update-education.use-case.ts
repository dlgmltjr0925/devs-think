import { EducationDto } from "~/server/application/dto/education.dto";
import { UpdateEducationDataDto } from "~/server/application/dto/update-education-data.dto";

export const UPDATE_EDUCATION_USE_CASE = Symbol("UpdateEducationUseCase");

export interface UpdateEducationUseCase {
  updateEducation(
    userId: number,
    educationId: number,
    updateEducationData: UpdateEducationDataDto,
  ): Promise<EducationDto>;
}
