import { ExperienceMediaType } from "./experience-media-type.enum";

export class ExperienceMedia {
  id: number;
  experienceId: number;
  type: ExperienceMediaType;
  url: string;
  title: string | null;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
