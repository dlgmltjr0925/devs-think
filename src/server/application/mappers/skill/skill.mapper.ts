import { Skill } from "~/server/domain/entities/skill";
import { SkillDto } from "~/server/application/dto/skill.dto";

export class SkillMapper {
  static toDto(skill: Skill): SkillDto {
    return {
      id: skill.id,
      name: skill.name,
      description: skill.description,
      category: skill.category,
      level: skill.level,
      createdAt: skill.createdAt,
      updatedAt: skill.updatedAt,
      deletedAt: skill.deletedAt,
    };
  }
}
