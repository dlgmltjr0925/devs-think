import { CursorBasedPaginationDto } from "~/server/application/dto/cursor-based-pagination.dto";
import { PostDto } from "~/server/application/dto/post.dto";

export const GET_POST_USE_CASE = Symbol.for("GetPostUseCase");

export interface GetPostUseCase {
  getPost(userId: number, postId: number): Promise<PostDto | null>;
  getMyPostsByTagId(
    userId: number,
    tagId?: number,
    cursor?: number,
    limit?: number,
  ): Promise<CursorBasedPaginationDto<PostDto>>;
  getPublicPostsByUserIdAndTagId(
    userId: number,
    tagId?: number,
    cursor?: number,
    limit?: number,
  ): Promise<CursorBasedPaginationDto<PostDto>>;
}
