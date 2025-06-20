import { ExperienceTypeDto } from "./experience-type.dto";
import { UpdateAwardDetailDataDto } from "./update-award-detail-data.dto";
import { UpdateCertificationDetailDataDto } from "./update-certification-detail-data.dto";
import { UpdateExperienceMediaDataDto } from "./update-experience-media-data.dto";
import { UpdateLanguageDetailDataDto } from "./update-language-detail-data.dto";
import { UpdateVolunteerDetailDataDto } from "./update-volunteer-detail-data.dto";

export class UpdateExperienceDataDto {
  type: ExperienceTypeDto;
  title: string;
  organization: string | null;
  description: string | null;
  startedAt: Date | null;
  endedAt: Date | null;
  isOngoing: boolean;
  url: string | null;

  certificationDetail: UpdateCertificationDetailDataDto | null;
  awardDetail: UpdateAwardDetailDataDto | null;
  languageDetail: UpdateLanguageDetailDataDto | null;
  volunteerDetail: UpdateVolunteerDetailDataDto | null;

  medias: UpdateExperienceMediaDataDto[];

  skillIds: number[];
}
