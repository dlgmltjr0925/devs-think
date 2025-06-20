import { EducationDegreeDto } from "./education-degree.dto";
import { UpdateEducationMediaDataDto } from "./update-education-media-data.dto";

export class UpdateEducationDataDto {
  schoolName: string;
  degree: EducationDegreeDto;
  major: string;
  startedAt: Date;
  endedAt: Date | null;
  gpa: number | null;
  activities: string | null;
  description: string | null;

  medias: UpdateEducationMediaDataDto[];

  skillIds: number[];
}
