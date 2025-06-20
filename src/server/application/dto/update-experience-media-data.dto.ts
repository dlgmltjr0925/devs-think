import { ExperienceMediaTypeDto } from "./experience-media-type.dto";

export class UpdateExperienceMediaDataDto {
  type: ExperienceMediaTypeDto;
  url: string;
  title: string | null;
  description: string | null;
}
