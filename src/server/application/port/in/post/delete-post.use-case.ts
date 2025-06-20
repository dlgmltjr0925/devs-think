export const DELETE_POST_USE_CASE = Symbol.for("DeletePostUseCase");

export interface DeletePostUseCase {
  deletePost(userId: number, postId: number): Promise<void>;
}
