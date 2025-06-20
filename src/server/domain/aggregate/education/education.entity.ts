import { EducationMedia } from "./education-media.entity";
import { EducationDegree } from "./education.enum";
import { SkillId } from "./skill-id.entity";

interface EducationConstructorArgs {
  id: number;
  userId: number;
  schoolName: string;
  degree: EducationDegree;
  major: string;
  startedAt: Date;
  endedAt: Date | null;
  gpa: number | null;
  activities: string | null;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;

  medias: EducationMedia[];

  skillIds: SkillId[];
}

export class Education {
  id: number;
  userId: number;
  schoolName: string;
  degree: EducationDegree;
  major: string;
  startedAt: Date;
  endedAt: Date | null;
  gpa: number | null;
  activities: string | null;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;

  medias: EducationMedia[];

  skillIds: SkillId[];

  constructor(args: EducationConstructorArgs) {
    this.id = args.id;
    this.userId = args.userId;
    this.schoolName = args.schoolName;
    this.degree = args.degree;
    this.major = args.major;
    this.startedAt = args.startedAt;
    this.endedAt = args.endedAt;
    this.gpa = args.gpa;
    this.activities = args.activities;
    this.description = args.description;
    this.createdAt = args.createdAt;
    this.updatedAt = args.updatedAt;

    this.medias = args.medias;

    this.skillIds = args.skillIds;
  }
}
