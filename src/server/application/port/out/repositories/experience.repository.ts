import { CreateExperienceDataDto } from "~/server/application/dto/create-experience-data.dto";
import { UpdateExperienceDataDto } from "~/server/application/dto/update-experience-data.dto";
import { Experience } from "~/server/domain/aggregate/experience";

export const EXPERIENCE_REPOSITORY = Symbol("ExperienceRepository");

export interface ExperienceRepository {
  createExperience(
    userId: number,
    createExperienceData: CreateExperienceDataDto,
  ): Promise<Experience>;
  findExperienceById(experienceId: number): Promise<Experience | null>;
  findExperiencesByUserId(userId: number): Promise<Experience[]>;
  updateExperience(
    experienceId: number,
    updateExperienceData: UpdateExperienceDataDto,
  ): Promise<Experience>;
  deleteExperience(experienceId: number): Promise<void>;
}
