export class PostDraftDto {
  id: number;
  userId: number;
  postId: number | null;
  title: string;
  content: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
