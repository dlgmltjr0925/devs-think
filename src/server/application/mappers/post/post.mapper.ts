import { Post } from "~/server/domain/aggregate/post";
import { PostDto } from "../../dto/post.dto";

export class PostMapper {
  static toDto(post: Post): PostDto {
    return {
      id: post.id,
      title: post.title,
      content: post.content,
      tags: post.tags,
      thumbnailUrl: post.thumbnailUrl,
      cleanUrl: post.cleanUrl,
      isPublic: post.isPublic,
      userId: post.userId,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      deletedAt: post.deletedAt,
    };
  }
}
