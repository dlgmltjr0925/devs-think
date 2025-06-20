import { Prisma } from "@prisma/client";
import { Post } from "~/server/domain/entities/post";

type PrismaPost = Prisma.PostGetPayload<{
  include: {
    postTagRelations: {
      include: {
        tag: true;
      };
    };
  };
}>;

export class PostMapper {
  static toDomain(post: PrismaPost): Post {
    return new Post({
      id: post.id,
      userId: post.userId,
      title: post.title,
      content: post.content,
      tags: post.postTagRelations.map((relation) => relation.tag.name),
      thumbnailUrl: post.thumbnailUrl,
      cleanUrl: post.cleanUrl,
      isPublic: post.isPublic,
      createdAt: post.createdAt,
      publishedAt: post.publishedAt,
      updatedAt: post.updatedAt,
      deletedAt: post.deletedAt,
    });
  }
}
