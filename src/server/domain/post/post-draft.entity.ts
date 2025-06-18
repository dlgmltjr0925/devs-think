interface PostDraftConstructorArgs {
  id: number;
  postId?: number;
  title: string;
  content: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
export class PostDraft {
  readonly id: number;
  readonly postId?: number;
  readonly title: string;
  readonly content: string;
  readonly tags: string[];
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt?: Date;

  constructor(args: PostDraftConstructorArgs) {
    this.id = args.id;
    this.postId = args.postId;
    this.title = args.title;
    this.content = args.content;
    this.tags = args.tags;
    this.createdAt = args.createdAt;
    this.updatedAt = args.updatedAt;
    this.deletedAt = args.deletedAt;
  }
}
