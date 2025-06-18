import { PostDraft } from "~/server/domain/entities/post-draft";
import { PostDraftDto } from "../../dto/post-draft.dto";

export class PostDraftMapper {
  static toDto(postDraft: PostDraft): PostDraftDto {
    return {
      id: postDraft.id,
      userId: postDraft.userId,
      postId: postDraft.postId,
      title: postDraft.title,
      content: postDraft.content,
      tags: postDraft.tags,
      createdAt: postDraft.createdAt,
      updatedAt: postDraft.updatedAt,
      deletedAt: postDraft.deletedAt,
    };
  }
}
