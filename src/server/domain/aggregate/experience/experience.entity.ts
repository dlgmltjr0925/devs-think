import { AwardDetail } from "./award-detail.entity";
import { CertificationDetail } from "./certification-detail.entity";
import { ExperienceType } from "./experience-type.enum";
import { LanguageDetail } from "./language-detail.entity";
import { Skill } from "../skill";
import { VolunteerDetail } from "./volunteer-detail.entity";
import { ExperienceMedia } from "./experience-media.entity";

export class Experience {
  id: number;
  userId: number;
  type: ExperienceType;
  title: string;
  organization: string | null;
  description: string | null;
  startedAt: Date | null;
  endedAt: Date | null;
  isOngoing: boolean;
  url: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  certificationDetail: CertificationDetail | null;
  awardDetail: AwardDetail | null;
  languageDetail: LanguageDetail | null;
  volunteerDetail: VolunteerDetail | null;

  medias: ExperienceMedia[];

  skills: Skill[];
}
