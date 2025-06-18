import { PostDraftDto } from "~/server/application/dto/post-draft.dto";
import { UpdatePostDraftDataDto } from "~/server/application/dto/update-post-draft-data.dto";

export const UPDATE_POST_DRAFT_USE_CASE = Symbol.for("UpdatePostDraftUseCase");

export interface UpdatePostDraftUseCase {
  updatePostDraft(
    userId: number,
    postDraftId: number,
    updatePostDraftData: UpdatePostDraftDataDto,
  ): Promise<PostDraftDto>;
}
