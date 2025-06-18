import { Inject, Injectable } from "~/server/infra/core";
import { CreateSkillUseCase, GetSkillUseCase } from "../port/in/skill";
import {
  SKILL_REPOSITORY,
  type SkillRepository,
} from "../port/out/repositories";
import { CreateSkillDataDto } from "../dto/create-skill-data.dto";
import { SkillDto } from "../dto/skill.dto";
import { SkillMapper } from "../mappers/skill";

@Injectable()
export class SkillService implements CreateSkillUseCase, GetSkillUseCase {
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

  async getSkillsByUserId(userId: number): Promise<SkillDto[]> {
    const skills = await this.skillRepository.findSkillsByUserId(userId);

    return skills.map(SkillMapper.toDto);
  }
}
