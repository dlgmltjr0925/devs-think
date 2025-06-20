import { CreateEducationDataDto } from "~/server/application/dto/create-education-data.dto";
import { UpdateEducationDataDto } from "~/server/application/dto/update-education-data.dto";
import { Education } from "~/server/domain/aggregate/education";

export const EDUCATION_REPOSITORY = Symbol("EducationRepository");

export interface EducationRepository {
  createEducation(
    userId: number,
    createEducationData: CreateEducationDataDto,
  ): Promise<Education>;
  findEducationById(educationId: number): Promise<Education | null>;
  findEducationsByUserId(userId: number): Promise<Education[]>;
  updateEducation(
    educationId: number,
    updateEducationData: UpdateEducationDataDto,
  ): Promise<Education>;
}
