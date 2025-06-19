import { LocationType } from "@prisma/client";
import { EmploymentType } from "./employment-type.entity";
import { CareerAchievement } from "./career-archievement.entity";

interface CareerConstructorArgs {
  id: number;
  userId: number;
  companyName: string;
  position: string;
  employmentType: EmploymentType;
  locationType: LocationType;
  location: string | null;
  startDate: Date;
  endDate: Date | null;
  isCurrentPosition: boolean;
  description: string | null;
  responsibilities: string | null;
  url: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  achievements: CareerAchievement[];
}

export class Career {
  id: number;
  userId: number;
  companyName: string;
  position: string;
  employmentType: EmploymentType;
  locationType: LocationType;
  location: string | null;
  startDate: Date;
  endDate: Date | null;
  isCurrentPosition: boolean;
  description: string | null;
  responsibilities: string | null;
  url: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  achievements: CareerAchievement[];

  constructor(args: CareerConstructorArgs) {
    this.id = args.id;
    this.userId = args.userId;
    this.companyName = args.companyName;
    this.position = args.position;
    this.employmentType = args.employmentType;
    this.locationType = args.locationType;
    this.location = args.location;
    this.startDate = args.startDate;
    this.endDate = args.endDate;
    this.isCurrentPosition = args.isCurrentPosition;
    this.description = args.description;
    this.responsibilities = args.responsibilities;
    this.url = args.url;
    this.createdAt = args.createdAt;
    this.updatedAt = args.updatedAt;
    this.deletedAt = args.deletedAt;
    this.achievements = args.achievements;
  }
}
