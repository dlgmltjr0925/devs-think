import { Inject, Injectable } from "~/server/infra/core";
import {
  CreateExperienceUseCase,
  GetExperienceUseCase,
} from "../port/in/experience";
import { CreateExperienceDataDto } from "../dto/create-experience-data.dto";
import { ExperienceDto } from "../dto/experience.dto";
import {
  EXPERIENCE_REPOSITORY,
  SKILL_REPOSITORY,
  type ExperienceRepository,
  type SkillRepository,
} from "../port/out/repositories";
import { ExperienceMapper } from "../mappers/experience/experience.mapper";
import { SkillMapper } from "../mappers/skill";

@Injectable()
export class ExperienceService
  implements CreateExperienceUseCase, GetExperienceUseCase
{
  constructor(
    @Inject(EXPERIENCE_REPOSITORY)
    private readonly experienceRepository: ExperienceRepository,
    @Inject(SKILL_REPOSITORY)
    private readonly skillRepository: SkillRepository,
  ) {}

  async createExperience(
    userId: number,
    createExperienceData: CreateExperienceDataDto,
  ): Promise<ExperienceDto> {
    const experience = await this.experienceRepository.createExperience(
      userId,
      createExperienceData,
    );
    const skills = await this.skillRepository.findSkillsByIds(
      experience.skillIds.map((skillId) => skillId.value),
    );

    return ExperienceMapper.toDto(experience, skills.map(SkillMapper.toDto));
  }

  async getExperience(experienceId: number): Promise<ExperienceDto | null> {
    const experience =
      await this.experienceRepository.findExperienceById(experienceId);

    if (!experience) {
      return null;
    }

    const skills = await this.skillRepository.findSkillsByIds(
      experience.skillIds.map((skillId) => skillId.value),
    );

    return ExperienceMapper.toDto(experience, skills);
  }

  async getExperiencesByUserId(userId: number): Promise<ExperienceDto[]> {
    const experiences =
      await this.experienceRepository.findExperiencesByUserId(userId);

    const skills = await this.skillRepository.findSkillsByIds(
      experiences.flatMap((experience) =>
        experience.skillIds.map((skillId) => skillId.value),
      ),
    );

    return experiences.map((experience) => {
      const experienceSkills = skills.filter((skill) =>
        experience.skillIds.some((skillId) => skillId.value === skill.id),
      );
      return ExperienceMapper.toDto(experience, experienceSkills);
    });
  }
}
