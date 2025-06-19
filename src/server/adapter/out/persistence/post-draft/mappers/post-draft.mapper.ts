import { Prisma } from "@prisma/client";
import { PostDraft } from "~/server/domain/aggregate/post-draft";

export class PostDraftMapper {
  static toDomain(postDraft: Prisma.PostDraftGetPayload<object>): PostDraft {
    return new PostDraft({
      id: postDraft.id,
      userId: postDraft.userId,
      postId: postDraft.postId,
      title: postDraft.title,
      content: postDraft.content,
      tags: postDraft.tags,
      createdAt: postDraft.createdAt,
      updatedAt: postDraft.updatedAt,
      deletedAt: postDraft.deletedAt,
    });
  }
}
