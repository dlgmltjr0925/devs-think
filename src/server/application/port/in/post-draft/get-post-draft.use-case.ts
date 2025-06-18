import { PostDraftDto } from "~/server/application/dto/post-draft.dto";

export const GET_POST_DRAFT_USE_CASE = Symbol.for("GetPostDraftUseCase");

export interface GetPostDraftUseCase {
  getPostDraft(userId: number, postDraftId: number): Promise<PostDraftDto>;
  getPostDrafts(userId: number): Promise<PostDraftDto[]>;
}
