import { EducationMediaTypeDto } from "./education-media-type.dto";

export class UpdateEducationMediaDataDto {
  type: EducationMediaTypeDto;
  url: string;
  title: string | null;
  description: string | null;
}
