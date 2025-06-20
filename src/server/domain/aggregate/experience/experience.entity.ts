import { AwardDetail } from "./award-detail.entity";
import { CertificationDetail } from "./certification-detail.entity";
import { ExperienceType } from "./experience-type.enum";
import { LanguageDetail } from "./language-detail.entity";
import { Skill } from "../skill";
import { VolunteerDetail } from "./volunteer-detail.entity";
import { ExperienceMedia } from "./experience-media.entity";
import { SkillId } from "./skill-id.entity";

interface ExperienceConstructorArgs {
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
  skillIds: SkillId[];
}
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

  skillIds: SkillId[];

  constructor(args: ExperienceConstructorArgs) {
    this.id = args.id;
    this.userId = args.userId;
    this.type = args.type;
    this.title = args.title;
    this.organization = args.organization;
    this.description = args.description;
    this.startedAt = args.startedAt;
    this.endedAt = args.endedAt;
    this.isOngoing = args.isOngoing;
    this.url = args.url;
    this.createdAt = args.createdAt;
    this.updatedAt = args.updatedAt;
    this.deletedAt = args.deletedAt;
    this.certificationDetail = args.certificationDetail;
    this.awardDetail = args.awardDetail;
    this.languageDetail = args.languageDetail;
    this.volunteerDetail = args.volunteerDetail;
    this.medias = args.medias;
    this.skillIds = args.skillIds;
  }
}
