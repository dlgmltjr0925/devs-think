import { EducationDegreeDto } from "./education-degree.dto";
import { EducationMediaDto } from "./education-media.dto";
import { SkillDto } from "./skill.dto";

export class EducationDto {
  id: number;
  schoolName: string;
  degree: EducationDegreeDto;
  major: string;
  startedAt: Date;
  endedAt: Date | null;
  gpa: number | null;
  activities: string | null;
  description: string | null;
  medias: EducationMediaDto[];
  skills: SkillDto[];
}
