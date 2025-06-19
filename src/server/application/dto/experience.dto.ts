import { AwardDetailDto } from "./award-detail.dto";
import { CertificationDetailDto } from "./certification-detail.dto";
import { ExperienceMediaDto } from "./experience-media.dto";
import { ExperienceTypeDto } from "./experience-type.dto";
import { LanguageDetailDto } from "./language-detail.dto";
import { SkillDto } from "./skill.dto";
import { VolunteerDetailDto } from "./volunteer-detail.dto";

export class ExperienceDto {
  id: number;
  type: ExperienceTypeDto;
  title: string;
  organization: string | null;
  description: string | null;
  startedAt: Date | null;
  endedAt: Date | null;
  isOngoing: boolean;
  url: string | null;
  createdAt: Date;
  updatedAt: Date;

  certificationDetail: CertificationDetailDto | null;
  awardDetail: AwardDetailDto | null;
  languageDetail: LanguageDetailDto | null;
  volunteerDetail: VolunteerDetailDto | null;

  medias: ExperienceMediaDto[];

  skills: SkillDto[];
}
