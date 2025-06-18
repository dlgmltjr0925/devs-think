import { CreatePostDataDto } from "~/server/application/dto/create-post-data.dto";
import { CursorBasedPaginationDto } from "~/server/application/dto/cursor-based-pagination.dto";
import { UpdatePostDataDto } from "~/server/application/dto/update-post-data.dto";
import { Post } from "~/server/domain/entities/post";

export const POST_REPOSITORY = Symbol.for("PostRepository");

export interface PostRepository {
  createPost(userId: number, createPostData: CreatePostDataDto): Promise<Post>;
  findPostById(postId: number): Promise<Post | null>;
  findMyPostsByTagId(
    userId: number,
    tagId: number | null,
    cursor: number | null,
    limit?: number,
  ): Promise<CursorBasedPaginationDto<Post>>;
  findPublicPostsByUserIdAndTagId(
    userId: number,
    tagId: number | null,
    cursor: number | null,
    limit?: number,
  ): Promise<CursorBasedPaginationDto<Post>>;
  updatePost(postId: number, updatePostData: UpdatePostDataDto): Promise<Post>;
}
