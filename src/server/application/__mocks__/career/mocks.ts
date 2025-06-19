import { CreateCareerDataDto } from "../../dto/create-career-data.dto";

export const mockCreateCareerDataDto: CreateCareerDataDto = {
  companyName: "Test Company",
  position: "Test Position",
  employmentType: "FullTime",
  locationType: "Office",
  location: "Test Location",
  startDate: new Date(),
  endDate: null,
  isCurrentPosition: false,
  description: "Test Description",
  responsibilities: "Test Responsibilities",
  url: "https://test.com",
  achievements: [
    {
      description: "Test Achievement",
      metrics: "Test Metrics",
    },
  ],
};
