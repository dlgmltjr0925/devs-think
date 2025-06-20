export class UpdatePostDataDto {
  title: string;
  content: string;
  tags: string[];
  thumbnailUrl: string;
  cleanUrl: string | null;
  isPublic: boolean;
  postDraftId: number | null;
}
