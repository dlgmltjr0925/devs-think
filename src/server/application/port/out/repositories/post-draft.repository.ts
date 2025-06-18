import { CreatePostDraftDataDto } from "~/server/application/dto/create-post-draft-data.dto";
import { PostDraft } from "~/server/domain/entities/post-draft";

export const POST_DRAFT_REPOSITORY = Symbol.for("PostDraftRepository");

export interface PostDraftRepository {
  createPostDraft(
    userId: number,
    createPostDraftData: CreatePostDraftDataDto,
  ): Promise<PostDraft>;
  findPostDraftById(postDraftId: number): Promise<PostDraft | null>;
}
