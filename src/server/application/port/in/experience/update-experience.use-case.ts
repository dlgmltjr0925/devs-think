import { ExperienceDto } from "~/server/application/dto/experience.dto";
import { UpdateExperienceDataDto } from "~/server/application/dto/update-experience-data.dto";

export const UPDATE_EXPERIENCE_USE_CASE = Symbol("UpdateExperienceUseCase");

export interface UpdateExperienceUseCase {
  updateExperience(
    userId: number,
    experienceId: number,
    updateExperienceData: UpdateExperienceDataDto,
  ): Promise<ExperienceDto>;
}
