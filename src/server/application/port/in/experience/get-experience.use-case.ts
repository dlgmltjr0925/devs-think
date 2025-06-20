import { ExperienceDto } from "~/server/application/dto/experience.dto";

export const GET_EXPERIENCE_USE_CASE = "GetExperienceUseCase";

export interface GetExperienceUseCase {
  getExperience(experienceId: number): Promise<ExperienceDto | null>;
}
