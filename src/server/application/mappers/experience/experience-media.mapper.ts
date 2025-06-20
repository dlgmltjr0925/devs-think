import { ExperienceMedia } from "~/server/domain/aggregate/experience";
import { ExperienceMediaDto } from "../../dto/experience-media.dto";

export class ExperienceMediaMapper {
  static toDto(experienceMedia: ExperienceMedia): ExperienceMediaDto {
    return {
      id: experienceMedia.id,
      experienceId: experienceMedia.experienceId,
      url: experienceMedia.url,
      type: experienceMedia.type,
      title: experienceMedia.title,
      description: experienceMedia.description,
    };
  }
}
