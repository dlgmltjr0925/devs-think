import { ExperienceMediaTypeDto } from "./experience-media-type.dto";

export class CreateExperienceMediaDataDto {
  type: ExperienceMediaTypeDto;
  url: string;
  title: string | null;
  description: string | null;
}
