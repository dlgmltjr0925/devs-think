import { PostDto } from "~/server/application/dto/post.dto";
import { UpdatePostDataDto } from "~/server/application/dto/update-post-data.dto";

export const UPDATE_POST_USE_CASE = Symbol.for("UpdatePostUseCase");

export interface UpdatePostUseCase {
  updatePost(
    userId: number,
    postId: number,
    updatePostData: UpdatePostDataDto,
  ): Promise<PostDto>;
}
