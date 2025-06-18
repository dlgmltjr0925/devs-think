import { SkillCategory } from "./skill-category.entity";
import { SkillLevel } from "./skill-level.entity";

interface SkillConstructorArgs {
  id: number;
  userId: number;
  name: string;
  description: string | null;
  category: SkillCategory | null;
  level: SkillLevel | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class Skill {
  readonly id: number;
  readonly userId: number;
  readonly name: string;
  readonly description: string | null;
  readonly category: SkillCategory | null;
  readonly level: SkillLevel | null;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date | null;

  constructor(args: SkillConstructorArgs) {
    this.id = args.id;
    this.userId = args.userId;
    this.name = args.name;
    this.description = args.description;
    this.category = args.category;
    this.level = args.level;
    this.createdAt = args.createdAt;
    this.updatedAt = args.updatedAt;
    this.deletedAt = args.deletedAt;
  }
}
