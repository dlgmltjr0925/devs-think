interface ProjectConstructorArgs {
  id: number;
  userId: number;
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
  deletedAt: Date | null;
}

export class Project {
  id: number;
  userId: number;
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
  deletedAt: Date | null;

  constructor(args: ProjectConstructorArgs) {
    this.id = args.id;
    this.userId = args.userId;
    this.title = args.title;
    this.description = args.description;
    this.role = args.role;
    this.startDate = args.startDate;
    this.endDate = args.endDate;
    this.isOngoing = args.isOngoing;
    this.url = args.url;
    this.repositoryUrl = args.repositoryUrl;
    this.createdAt = args.createdAt;
    this.updatedAt = args.updatedAt;
    this.deletedAt = args.deletedAt;
  }
}
