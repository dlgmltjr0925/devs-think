export class CreatePostDataDto {
  title: string;
  content: string;
  tags: string[];
  thumbnailUrl: string;
  cleanUrl: string | null;
  isPublic: boolean;
  userId: number;
}
