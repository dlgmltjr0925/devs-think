import { CreateEducationDataDto } from "../../dto/create-education-data.dto";

export const mockCreateEducationData: CreateEducationDataDto = {
  schoolName: "Test School",
  degree: "Associate",
  major: "Test Major",
  startedAt: new Date(),
  endedAt: new Date(),
  gpa: 4.0,
  activities: "Test Activities",
  description: "Test Description",
  medias: [
    {
      type: "Image",
      url: "https://example.com/image.jpg",
      title: "Image Title",
      description: "Image Description",
    },
  ],
  skillIds: [],
};
