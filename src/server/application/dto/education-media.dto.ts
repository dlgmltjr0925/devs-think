import { EducationMediaTypeDto } from "./education-media-type.dto";

export class EducationMediaDto {
  id: number;
  type: EducationMediaTypeDto;
  url: string;
  title: string | null;
  description: string | null;
}
