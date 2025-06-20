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
  certificationDetail: {
    certificationNumber: "test",
    issuedBy: "test",
    validUntil: new Date(),
  },
  awardDetail: {
    rank: "test",
    prize: "test",
    category: "test",
  },
  languageDetail: {
    language: "test",
    testType: "test",
    score: "test",
    level: "Beginner",
  },
  volunteerDetail: {
    hours: 10,
    target: "test",
    location: "test",
  },
  medias: [
    {
      type: "Image",
      url: "test",
      title: "test",
      description: "test",
    },
  ],
  skillIds: [],
};

export const mockCreateExperienceDataForNull: CreateExperienceDataDto = {
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
