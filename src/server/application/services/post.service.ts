import { Inject, Injectable } from "~/server/infra/core";
import { CreatePostUseCase } from "~/server/application/port/in/post/create-post.use-case";
import {
  POST_REPOSITORY,
  type PostRepository,
} from "../port/out/repositories/post.repository";
import { CreatePostDataDto } from "../dto/create-post-data.dto";
import { PostDto } from "../dto/post.dto";
import { PostMapper } from "../mappers/post/post.mapper";
import {
  POST_DRAFT_REPOSITORY,
  type PostDraftRepository,
} from "../port/out/repositories";
import { transactional } from "~/server/infra/transaction";
import { GetPostUseCase } from "../port/in/post";

@Injectable()
export class PostService implements CreatePostUseCase, GetPostUseCase {
  constructor(
    @Inject(POST_REPOSITORY) private readonly postRepository: PostRepository,
    @Inject(POST_DRAFT_REPOSITORY)
    private readonly postDraftRepository: PostDraftRepository,
  ) {}

  @transactional()
  async createPost(
    userId: number,
    createPostData: CreatePostDataDto,
  ): Promise<PostDto> {
    const post = await this.postRepository.createPost(userId, createPostData);

    if (createPostData.postDraftId) {
      await this.postDraftRepository.deletePostDraft(
        createPostData.postDraftId,
      );
    }

    return PostMapper.toDto(post);
  }

  async getPost(userId: number, postId: number): Promise<PostDto | null> {
    const post = await this.postRepository.findPostById(postId);

    if (!post) {
      return null;
    }

    if (post.userId !== userId && !post.isPublic) {
      return null;
    }

    return PostMapper.toDto(post);
  }
}
