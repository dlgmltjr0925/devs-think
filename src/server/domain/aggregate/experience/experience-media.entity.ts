import { ExperienceMediaType } from "./experience-media-type.enum";

interface ExperienceMediaConstructorArgs {
  id: number;
  experienceId: number;
  type: ExperienceMediaType;
  url: string;
  title: string | null;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
export class ExperienceMedia {
  id: number;
  experienceId: number;
  type: ExperienceMediaType;
  url: string;
  title: string | null;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  constructor(args: ExperienceMediaConstructorArgs) {
    this.id = args.id;
    this.experienceId = args.experienceId;
    this.type = args.type;
    this.url = args.url;
    this.title = args.title;
    this.description = args.description;
    this.createdAt = args.createdAt;
    this.updatedAt = args.updatedAt;
    this.deletedAt = args.deletedAt;
  }
}
