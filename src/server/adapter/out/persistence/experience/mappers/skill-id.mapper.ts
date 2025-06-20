import { SkillId } from "~/server/domain/aggregate/experience";

export class SkillIdMapper {
  static toDomain(skillId: number): SkillId {
    return new SkillId(skillId);
  }
}
