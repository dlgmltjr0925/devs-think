import { ExperienceMediaTypeDto } from "./experience-media-type.dto";

export class ExperienceMediaDto {
  id: number;
  type: ExperienceMediaTypeDto;
  url: string;
  title: string | null;
  description: string | null;
}
