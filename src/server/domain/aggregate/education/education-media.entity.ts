import { EducationMediaType } from "./education-media-type.enum";

export class EducationMedia {
  id: number;
  type: EducationMediaType;
  url: string;
  title?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}
