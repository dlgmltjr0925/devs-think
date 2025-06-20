import { CreateExperienceDataDto } from "../../dto/create-experience-data.dto";

export const mockCreateExperienceData: CreateExperienceDataDto = {
  type: "Certification",
  title: "test",
  organization: "test",
  description: "test",
  startedAt: new Date(),
  endedAt: null,
  isOngoing: false,
  url: "test",
  certificationDetail: null,
  awardDetail: null,
  languageDetail: null,
  volunteerDetail: null,
  medias: [],
  skillIds: [],
};
