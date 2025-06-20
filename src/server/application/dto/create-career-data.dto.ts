import { CreateCareerAchievementDataDto } from "./create-career-archievement-data.dto";
import { EmploymentTypeDto } from "./employment-type.dto";
import { LocationTypeDto } from "./location-type.dto";

export class CreateCareerDataDto {
  companyName: string;
  position: string;
  employmentType: EmploymentTypeDto;
  locationType: LocationTypeDto;
  location: string | null;
  startDate: Date;
  endDate: Date | null;
  isCurrentPosition: boolean;
  description: string | null;
  responsibilities: string | null;
  url: string | null;
  achievements: CreateCareerAchievementDataDto[];
}
