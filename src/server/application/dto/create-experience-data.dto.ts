import { ConnectSkillDataDto } from "./connect-skill-data.dto";
import { CreateAwardDetailDataDto } from "./create-award-detail-data.dto";
import { CreateCertificationDetailDataDto } from "./create-certification-detail-data.dto";
import { CreateExperienceMediaDataDto } from "./create-experience-media-data.dto";
import { CreateLanguageDetailDataDto } from "./create-language-detail-data.dto";
import { CreateVolunteerDetailDataDto } from "./create-volunteer-detail-data.dto";
import { ExperienceTypeDto } from "./experience-type.dto";

export class CreateExperienceDataDto {
  type: ExperienceTypeDto;
  title: string;
  organization: string | null;
  description: string | null;
  startedAt: Date | null;
  endedAt: Date | null;
  isOngoing: boolean;
  url: string | null;

  certificationDetail: CreateCertificationDetailDataDto | null;
  awardDetail: CreateAwardDetailDataDto | null;
  languageDetail: CreateLanguageDetailDataDto | null;
  volunteerDetail: CreateVolunteerDetailDataDto | null;

  medias: CreateExperienceMediaDataDto[];

  skills: ConnectSkillDataDto[];
}
