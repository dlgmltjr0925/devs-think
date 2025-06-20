import { EducationMediaType } from "./education-media-type.enum";

interface EducationMediaConstructorArgs {
  id: number;
  type: EducationMediaType;
  url: string;
  title: string | null;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}
export class EducationMedia {
  id: number;
  type: EducationMediaType;
  url: string;
  title: string | null;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;

  constructor(props: EducationMediaConstructorArgs) {
    this.id = props.id;
    this.type = props.type;
    this.url = props.url;
    this.title = props.title;
    this.description = props.description;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
