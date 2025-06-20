import { Inject, Injectable } from "~/server/infra/core";
import { WritePostUseCase } from "~/server/application/port/in/post/write-post.use-case";
import { CreatePostDraftDataDto } from "~/server/application/dto/create-post-draft-data.dto";
import { PostDto } from "~/server/application/dto/post.dto";
import {
  POST_REPOSITORY,
  type PostRepository,
} from "../port/out/repositories/post.repository";

@Injectable()
export class PostService implements WritePostUseCase {
  constructor(
    @Inject(POST_REPOSITORY) private readonly postRepository: PostRepository,
  ) {}

  async createPostDraft(
    userId: number,
    createPostDraftData: CreatePostDraftDataDto,
  ): Promise<PostDto> {
    const post = await this.postRepository.createPostDraft(
      userId,
      createPostDraftData,
    );
  }
}
