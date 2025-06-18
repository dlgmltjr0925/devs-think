import { PostDto } from "~/server/application/dto/post.dto";
import { CreatePostDraftDataDto } from "~/server/application/dto/create-post-draft-data.dto";

export interface WritePostUseCase {
  createPostDraft(
    userId: number,
    postDraftData: CreatePostDraftDataDto,
  ): PostDto;
  // publishPost(post: CreatePostDataDto): PostDto;
}
