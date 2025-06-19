import { Inject, Injectable } from "~/server/infra/core";
import {
  CreateSkillUseCase,
  GetSkillUseCase,
  UpdateSkillUseCase,
} from "../port/in/skill";
import {
  SKILL_REPOSITORY,
  type SkillRepository,
} from "../port/out/repositories";
import { CreateSkillDataDto } from "../dto/create-skill-data.dto";
import { SkillDto } from "../dto/skill.dto";
import { SkillMapper } from "../mappers/skill";
import { UpdateSkillDataDto } from "../dto/update-skill-data.dto";
import { NotFoundError } from "~/shared/error/not-found.error";
import { ForbiddenError } from "~/shared/error";

@Injectable()
export class SkillService
  implements CreateSkillUseCase, GetSkillUseCase, UpdateSkillUseCase
{
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

  async getSkill(userId: number, skillId: number): Promise<SkillDto | null> {
    const skill = await this.skillRepository.findSkillById(skillId);

    if (!skill) {
      return null;
    }

    return SkillMapper.toDto(skill);
  }

  async getSkillsByUserId(userId: number): Promise<SkillDto[]> {
    const skills = await this.skillRepository.findSkillsByUserId(userId);

    return skills.map(SkillMapper.toDto);
  }

  async updateSkill(
    userId: number,
    skillId: number,
    updateSkillData: UpdateSkillDataDto,
  ): Promise<SkillDto> {
    const skill = await this.skillRepository.findSkillById(skillId);

    if (!skill) {
      throw new NotFoundError();
    }

    if (skill.userId !== userId) {
      throw new ForbiddenError();
    }

    const updatedSkill = await this.skillRepository.updateSkill(
      skillId,
      updateSkillData,
    );

    return SkillMapper.toDto(updatedSkill);
  }
}
