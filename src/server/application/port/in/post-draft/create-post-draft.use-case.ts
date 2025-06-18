import { CreatePostDraftDataDto } from "~/server/application/dto/create-post-draft-data.dto";
import { PostDraftDto } from "~/server/application/dto/post-draft.dto";

export const CREATE_POST_DRAFT_USE_CASE = Symbol.for("CreatePostDraftUseCase");

export interface CreatePostDraftUseCase {
  createPostDraft(
    userId: number,
    createPostDraftData: CreatePostDraftDataDto,
  ): Promise<PostDraftDto>;
}
