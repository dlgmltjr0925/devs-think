import { CreateProjectDataDto } from "~/server/application/dto/create-project-data.dto";

export const mockCreateProjectData: CreateProjectDataDto = {
  title: "Test Project",
  description: "Test Description",
  role: "Test Role",
  startDate: new Date(),
  endDate: new Date(),
  isOngoing: false,
  url: "https://test.com",
  repositoryUrl: "https://test.com",
};
