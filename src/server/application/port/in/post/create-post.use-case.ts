import { CreatePostDataDto } from "~/server/application/dto/create-post-data.dto";
import { PostDto } from "~/server/application/dto/post.dto";

export const CREATE_POST_USE_CASE = Symbol.for("CreatePostUseCase");

export interface CreatePostUseCase {
  createPost(
    userId: number,
    createPostData: CreatePostDataDto,
  ): Promise<PostDto>;
}
