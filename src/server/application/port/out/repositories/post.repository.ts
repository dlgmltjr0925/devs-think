import { CreatePostDataDto } from "~/server/application/dto/create-post-data.dto";
import { Post } from "~/server/domain/entities/post";

export const POST_REPOSITORY = Symbol.for("PostRepository");

export interface PostRepository {
  createPost(userId: number, createPostData: CreatePostDataDto): Promise<Post>;
  findPostById(postId: number): Promise<Post | null>;
}
