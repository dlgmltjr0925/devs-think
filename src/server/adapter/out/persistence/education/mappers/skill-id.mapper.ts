import { SkillId } from "~/server/domain/aggregate/education";

export class SkillIdMapper {
  static toDomain(skillId: number): SkillId {
    return new SkillId(skillId);
  }
}
