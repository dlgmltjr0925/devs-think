import { Prisma } from "@prisma/client";
import {
  ExperienceMedia,
  ExperienceMediaType,
} from "~/server/domain/aggregate/experience";

export class ExperienceMediaMapper {
  static toDomain(
    experienceMedia: Prisma.ExperienceMediaGetPayload<object>,
  ): ExperienceMedia {
    return new ExperienceMedia({
      id: experienceMedia.id,
      experienceId: experienceMedia.experienceId,
      type: ExperienceMediaType[experienceMedia.type],
      url: experienceMedia.url,
      title: experienceMedia.title,
      description: experienceMedia.description,
      createdAt: experienceMedia.createdAt,
      updatedAt: experienceMedia.updatedAt,
      deletedAt: experienceMedia.deletedAt,
    });
  }
}
