import { PostDto } from "~/server/application/dto/post.dto";

export const GET_POST_USE_CASE = Symbol.for("GetPostUseCase");

export interface GetPostUseCase {
  getPost(userId: number, postId: number): Promise<PostDto | null>;
}
