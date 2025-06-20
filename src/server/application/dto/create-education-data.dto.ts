import { CreateEducationMediaDataDto } from "./create-education-media-data.dto";
import { EducationDegreeDto } from "./education-degree.dto";

export class CreateEducationDataDto {
  schoolName: string;
  degree: EducationDegreeDto;
  major: string;
  startedAt: Date;
  endedAt: Date | null;
  gpa: number | null;
  activities: string | null;
  description: string | null;

  medias: CreateEducationMediaDataDto[];

  skillIds: number[];
}
