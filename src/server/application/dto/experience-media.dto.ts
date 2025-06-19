import { ExperienceMediaTypeDto } from "./experience-media-type.dto";

export class ExperienceMediaDto {
  id: number;
  experienceId: number;
  type: ExperienceMediaTypeDto;
  url: string;
  title: string | null;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
