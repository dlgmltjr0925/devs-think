import { EducationMediaTypeDto } from "./education-media-type.dto";

export class CreateEducationMediaDataDto {
  type: EducationMediaTypeDto;
  url: string;
  title: string | null;
  description: string | null;
}
