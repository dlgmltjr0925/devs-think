import { Inject, Injectable } from "~/server/infra/core";
import {
  CreateExperienceUseCase,
  DeleteExperienceUseCase,
  GetExperienceUseCase,
  UpdateExperienceUseCase,
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
import { UpdateExperienceDataDto } from "../dto/update-experience-data.dto";
import { ForbiddenError, NotFoundError } from "~/shared/error";

@Injectable()
export class ExperienceService
  implements
    CreateExperienceUseCase,
    GetExperienceUseCase,
    UpdateExperienceUseCase,
    DeleteExperienceUseCase
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

  async updateExperience(
    userId: number,
    experienceId: number,
    updateExperienceData: UpdateExperienceDataDto,
  ): Promise<ExperienceDto> {
    const experience =
      await this.experienceRepository.findExperienceById(experienceId);

    if (!experience) {
      throw new Error("Experience not found");
    }

    if (experience.userId !== userId) {
      throw new Error("Experience not found");
    }

    const updatedExperience = await this.experienceRepository.updateExperience(
      experienceId,
      updateExperienceData,
    );

    const skills = await this.skillRepository.findSkillsByIds(
      updatedExperience.skillIds.map((skillId) => skillId.value),
    );

    return ExperienceMapper.toDto(
      updatedExperience,
      skills.map(SkillMapper.toDto),
    );
  }

  async deleteExperience(userId: number, experienceId: number): Promise<void> {
    const experience =
      await this.experienceRepository.findExperienceById(experienceId);

    if (!experience) {
      throw new NotFoundError();
    }

    if (experience.userId !== userId) {
      throw new ForbiddenError();
    }

    await this.experienceRepository.deleteExperience(experienceId);
  }
}
