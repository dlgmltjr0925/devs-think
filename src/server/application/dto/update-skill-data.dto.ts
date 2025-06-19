import { SkillCategoryDto } from "./skill-category.dto";
import { SkillLevelDto } from "./skill-level.dto";

export class UpdateSkillDataDto {
  name: string;
  description: string | null;
  category: SkillCategoryDto | null;
  level: SkillLevelDto | null;
}
