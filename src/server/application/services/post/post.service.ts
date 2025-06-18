import { Injectable } from "~/server/infra/core";
import { WritePostUseCase } from "~/server/application/port/in/post/write-post.use-case";
import { CreatePostDraftDataDto } from "~/server/application/dto/create-post-draft-data.dto";
import { PostDto } from "~/server/application/dto/post.dto";

@Injectable()
export class PostService implements WritePostUseCase {
  createPostDraft(
    userId: number,
    postDraftData: CreatePostDraftDataDto,
  ): PostDto {
    return new PostDto();
  }
}
