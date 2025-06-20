import { PostDraftDto } from "./post-draft.dto";

export class PostDto {
  id: number;
  title: string;
  content: string;
  tags: string[];
  thumbnailUrl: string;
  cleanUrl: string | null;
  isPublic: boolean;
  userId: number;
  createdAt: Date;
  publishedAt: Date | null;
  updatedAt: Date;
  deletedAt: Date | null;

  postDrafts: PostDraftDto[];
}
