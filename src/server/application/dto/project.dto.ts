export class ProjectDto {
  id: number;
  title: string;
  description: string | null;
  role: string | null;
  startDate: Date;
  endDate: Date | null;
  isOngoing: boolean;
  url: string | null;
  repositoryUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}
