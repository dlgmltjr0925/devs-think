export const DELETE_POST_DRAFT_USE_CASE = Symbol.for("DeletePostDraftUseCase");

export interface DeletePostDraftUseCase {
  deletePostDraft(userId: number, postDraftId: number): Promise<void>;
}
