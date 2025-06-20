import { Prisma } from "@prisma/client";
import {
  EducationMedia,
  EducationMediaType,
} from "~/server/domain/aggregate/education";

export class EducationMediaMapper {
  static toDomain(
    educationMedia: Prisma.EducationMediaGetPayload<object>,
  ): EducationMedia {
    return new EducationMedia({
      id: educationMedia.id,
      type: EducationMediaType[educationMedia.type],
      url: educationMedia.url,
      title: educationMedia.title,
      description: educationMedia.description,
      createdAt: educationMedia.createdAt,
      updatedAt: educationMedia.updatedAt,
    });
  }
}
