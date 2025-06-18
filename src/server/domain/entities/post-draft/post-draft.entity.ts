interface PostDraftConstructorArgs {
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
export class PostDraft {
  readonly id: number;
  readonly userId: number;
  readonly postId: number | null;
  readonly title: string;
  readonly content: string;
  readonly tags: string[];
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date | null;

  constructor(args: PostDraftConstructorArgs) {
    this.id = args.id;
    this.userId = args.userId;
    this.postId = args.postId;
    this.title = args.title;
    this.content = args.content;
    this.tags = args.tags;
    this.createdAt = args.createdAt;
    this.updatedAt = args.updatedAt;
    this.deletedAt = args.deletedAt;
  }
}
