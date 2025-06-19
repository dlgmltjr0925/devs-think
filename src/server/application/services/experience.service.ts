import { Injectable } from "~/server/infra/core";
import { CreateExperienceUseCase } from "../port/in/experience";
import { CreateExperienceDataDto } from "../dto/create-experience-data.dto";
import { ExperienceDto } from "../dto/experience.dto";

@Injectable()
export class ExperienceService implements CreateExperienceUseCase {
  createExperience(
    userId: number,
    createExperienceDto: CreateExperienceDataDto,
  ): Promise<ExperienceDto> {
    throw new Error("Method not implemented.");
  }
}
