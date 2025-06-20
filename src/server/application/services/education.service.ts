import { Inject, Injectable } from "~/server/infra/core";
import {
  CreateEducationUseCase,
  GetEducationUseCase,
} from "../port/in/education";
import { CreateEducationDataDto } from "../dto/create-education-data.dto";
import { EducationDto } from "../dto/education.dto";
import {
  EDUCATION_REPOSITORY,
  SKILL_REPOSITORY,
  type EducationRepository,
  type SkillRepository,
} from "../port/out/repositories";
import { EducationMapper } from "../mappers/education";
import { SkillMapper } from "../mappers/skill";

@Injectable()
export class EducationService
  implements CreateEducationUseCase, GetEducationUseCase
{
  constructor(
    @Inject(EDUCATION_REPOSITORY)
    private readonly educationRepository: EducationRepository,
    @Inject(SKILL_REPOSITORY)
    private readonly skillRepository: SkillRepository,
  ) {}

  async createEducation(
    userId: number,
    createEducationData: CreateEducationDataDto,
  ): Promise<EducationDto> {
    const education = await this.educationRepository.createEducation(
      userId,
      createEducationData,
    );

    const skills = await this.skillRepository.findSkillsByIds(
      education.skillIds.map((skillId) => skillId.value),
    );

    return EducationMapper.toDto(education, skills.map(SkillMapper.toDto));
  }

  async getEducation(educationId: number): Promise<EducationDto | null> {
    const education =
      await this.educationRepository.findEducationById(educationId);

    if (!education) {
      return null;
    }

    const skills = await this.skillRepository.findSkillsByIds(
      education.skillIds.map((skillId) => skillId.value),
    );

    return EducationMapper.toDto(education, skills.map(SkillMapper.toDto));
  }

  async getEducationsByUserId(userId: number): Promise<EducationDto[]> {
    const educations =
      await this.educationRepository.findEducationsByUserId(userId);

    const skills = await this.skillRepository.findSkillsByIds(
      educations.flatMap((education) =>
        education.skillIds.map((skillId) => skillId.value),
      ),
    );

    return educations.map((education) => {
      const educationSkills = skills.filter((skill) =>
        education.skillIds.some((skillId) => skillId.value === skill.id),
      );

      return EducationMapper.toDto(
        education,
        educationSkills.map(SkillMapper.toDto),
      );
    });
  }
}
