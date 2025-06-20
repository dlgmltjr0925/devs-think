export class PostDto {
  id: number;
  title: string;
  content: string;
  tags: string[];
  thumbnailUrl: string | null;
  cleanUrl: string | null;
  isPublic: boolean;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
