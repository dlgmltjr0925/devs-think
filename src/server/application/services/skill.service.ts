import { Inject, Injectable } from "~/server/infra/core";
import { CreateSkillUseCase } from "../port/in/skill";
import {
  SKILL_REPOSITORY,
  type SkillRepository,
} from "../port/out/repositories";
import { CreateSkillDataDto } from "../dto/create-skill-data.dto";
import { SkillDto } from "../dto/skill.dto";
import { SkillMapper } from "../mappers/skill";

@Injectable()
export class SkillService implements CreateSkillUseCase {
  constructor(
    @Inject(SKILL_REPOSITORY) private readonly skillRepository: SkillRepository,
  ) {}

  async createSkill(
    userId: number,
    createSkillData: CreateSkillDataDto,
  ): Promise<SkillDto> {
    const skill = await this.skillRepository.createSkill(
      userId,
      createSkillData,
    );

    return SkillMapper.toDto(skill);
  }
}
