import { CreateExperienceDataDto } from "~/server/application/dto/create-experience-data.dto";
import { ExperienceDto } from "~/server/application/dto/experience.dto";

export const CREATE_EXPERIENCE_USE_CASE = Symbol.for("CreateExperienceUseCase");

export interface CreateExperienceUseCase {
  createExperience(
    userId: number,
    createExperienceData: CreateExperienceDataDto,
  ): Promise<ExperienceDto>;
}
