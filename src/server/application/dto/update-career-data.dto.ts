import { EmploymentTypeDto } from "./employment-type.dto";
import { LocationTypeDto } from "./location-type.dto";
import { UpdateCareerAchievementDataDto } from "./update-career-archievement-data.dto";

export class UpdateCareerDataDto {
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
  achievements: UpdateCareerAchievementDataDto[];
}
