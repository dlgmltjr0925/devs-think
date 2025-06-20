import { Prisma } from "@prisma/client";
import {
  Experience,
  ExperienceType,
} from "~/server/domain/aggregate/experience";
import { CertificationDetailMapper } from "./certification-detail.mapper";
import { AwardDetailMapper } from "./award-detail.mapper";
import { LanguageDetailMapper } from "./language-detail.mapper";
import { VolunteerDetailMapper } from "./volunteer-detail.mapper";
import { ExperienceMediaMapper } from "./experience-media.mapper";
import { SkillIdMapper } from "./skill-id.mapper";

type PrismaExperience = Prisma.ExperienceGetPayload<{
  include: {
    certificationDetail: true;
    awardDetail: true;
    languageDetail: true;
    volunteerDetail: true;
    medias: true;
    skills: true;
  };
}>;

export class ExperienceMapper {
  static toDomain(experience: PrismaExperience): Experience {
    return new Experience({
      id: experience.id,
      userId: experience.userId,
      type: ExperienceType[experience.type],
      title: experience.title,
      organization: experience.organization,
      description: experience.description,
      startedAt: experience.startedAt,
      endedAt: experience.endedAt,
      isOngoing: experience.isOngoing,
      url: experience.url,
      createdAt: experience.createdAt,
      updatedAt: experience.updatedAt,
      deletedAt: experience.deletedAt,
      certificationDetail: experience.certificationDetail
        ? CertificationDetailMapper.toDomain(experience.certificationDetail)
        : null,
      awardDetail: experience.awardDetail
        ? AwardDetailMapper.toDomain(experience.awardDetail)
        : null,
      languageDetail: experience.languageDetail
        ? LanguageDetailMapper.toDomain(experience.languageDetail)
        : null,
      volunteerDetail: experience.volunteerDetail
        ? VolunteerDetailMapper.toDomain(experience.volunteerDetail)
        : null,
      medias: experience.medias.map(ExperienceMediaMapper.toDomain),
      skillIds: experience.skills.map((relation) =>
        SkillIdMapper.toDomain(relation.skillId),
      ),
    });
  }
}
