import { Prisma } from "@prisma/client";
import { Skill } from "~/server/domain/entities/skill";
import { SkillCategory } from "~/server/domain/entities/skill/skill-category.entity";
import { SkillLevel } from "~/server/domain/entities/skill/skill-level.entity";

export class SkillMapper {
  static toDomain(skill: Prisma.SkillGetPayload<object>): Skill {
    return new Skill({
      id: skill.id,
      name: skill.name,
      description: skill.description,
      category: skill.category ? SkillCategory[skill.category] : null,
      level: skill.level ? SkillLevel[skill.level] : null,
      userId: skill.userId,
      createdAt: skill.createdAt,
      updatedAt: skill.updatedAt,
      deletedAt: skill.deletedAt,
    });
  }
}
