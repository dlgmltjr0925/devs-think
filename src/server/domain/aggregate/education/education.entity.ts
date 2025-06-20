import { EducationMedia } from "./education-media.entity";
import { EducationDegree } from "./education.enum";
import { SkillId } from "./skill-id.entity";

interface EducationConstructorArgs {
  id: number;
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

  constructor(props: EducationConstructorArgs) {
    this.id = props.id;
    this.schoolName = props.schoolName;
    this.degree = props.degree;
    this.major = props.major;
    this.startedAt = props.startedAt;
    this.endedAt = props.endedAt;
    this.gpa = props.gpa;
    this.activities = props.activities;
    this.description = props.description;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;

    this.medias = props.medias;

    this.skillIds = props.skillIds;
  }
}
