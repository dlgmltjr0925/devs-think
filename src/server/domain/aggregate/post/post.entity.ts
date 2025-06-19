interface PostConstructorArgs {
  id: number;
  title: string;
  content: string;
  tags: string[];
  thumbnailUrl: string | null;
  cleanUrl: string | null;
  isPublic: boolean;
  userId: number;
  createdAt: Date;
  publishedAt: Date | null;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class Post {
  readonly id: number;
  readonly title: string;
  readonly content: string;
  readonly tags: string[];
  readonly thumbnailUrl: string | null;
  readonly cleanUrl: string | null;
  readonly isPublic: boolean;
  readonly userId: number;
  readonly createdAt: Date;
  readonly publishedAt: Date | null;
  readonly updatedAt: Date;
  readonly deletedAt: Date | null;

  constructor(args: PostConstructorArgs) {
    this.id = args.id;
    this.title = args.title;
    this.content = args.content;
    this.tags = args.tags;
    this.thumbnailUrl = args.thumbnailUrl;
    this.cleanUrl = args.cleanUrl;
    this.isPublic = args.isPublic;
    this.userId = args.userId;
    this.createdAt = args.createdAt;
    this.publishedAt = args.publishedAt;
    this.updatedAt = args.updatedAt;
    this.deletedAt = args.deletedAt;
  }
}
