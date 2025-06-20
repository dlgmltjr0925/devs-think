import { EducationMedia } from "~/server/domain/aggregate/education";
import { EducationMediaDto } from "../../dto/education-media.dto";

export class EducationMediaMapper {
  static toDto(educationMedia: EducationMedia): EducationMediaDto {
    return {
      id: educationMedia.id,
      url: educationMedia.url,
      type: educationMedia.type,
      title: educationMedia.title,
      description: educationMedia.description,
    };
  }
}
