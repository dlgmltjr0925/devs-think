import { Experience } from "~/server/domain/aggregate/experience";
import { ExperienceDto } from "../../dto/experience.dto";
import { SkillDto } from "../../dto/skill.dto";
import { CertificationDetailMapper } from "./certification-detail.mapper";
import { AwardDetailMapper } from "./award-detail.mapper";
import { LanguageDetailMapper } from "./language-detail.mapper";
import { VolunteerDetailMapper } from "./volunteer-detail.mapper";
import { ExperienceMediaMapper } from "./experience-media.mapper";

export class ExperienceMapper {
  static toDto(experience: Experience, skills: SkillDto[]): ExperienceDto {
    return {
      id: experience.id,
      type: experience.type,
      title: experience.title,
      organization: experience.organization,
      description: experience.description,
      startedAt: experience.startedAt,
      endedAt: experience.endedAt,
      isOngoing: experience.isOngoing,
      url: experience.url,
      createdAt: experience.createdAt,
      updatedAt: experience.updatedAt,

      certificationDetail: experience.certificationDetail
        ? CertificationDetailMapper.toDto(experience.certificationDetail)
        : null,
      awardDetail: experience.awardDetail
        ? AwardDetailMapper.toDto(experience.awardDetail)
        : null,
      languageDetail: experience.languageDetail
        ? LanguageDetailMapper.toDto(experience.languageDetail)
        : null,
      volunteerDetail: experience.volunteerDetail
        ? VolunteerDetailMapper.toDto(experience.volunteerDetail)
        : null,
      medias: experience.medias.map(ExperienceMediaMapper.toDto),

      skills,
    };
  }
}
