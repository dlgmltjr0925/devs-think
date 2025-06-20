import { Inject, Injectable } from "~/server/infra/core";
import { CreateEducationUseCase } from "../port/in/education";
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
export class EducationService implements CreateEducationUseCase {
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
}
