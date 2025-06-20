import { SkillCategoryDto } from "./skill-category.dto";
import { SkillLevelDto } from "./skill-level.dto";

export class SkillDto {
  id: number;
  name: string;
  description: string | null;
  category: SkillCategoryDto | null;
  level: SkillLevelDto | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
