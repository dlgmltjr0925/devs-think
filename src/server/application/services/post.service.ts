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
import {
  DeletePostUseCase,
  GetPostUseCase,
  UpdatePostUseCase,
} from "../port/in/post";
import { CursorBasedPaginationDto } from "../dto/cursor-based-pagination.dto";
import { UpdatePostDataDto } from "../dto/update-post-data.dto";
import { NotFoundError } from "~/shared/error/not-found.error";
import { ForbiddenError } from "~/shared/error";

@Injectable()
export class PostService
  implements
    CreatePostUseCase,
    GetPostUseCase,
    UpdatePostUseCase,
    DeletePostUseCase
{
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

  async getMyPostsByTagId(
    userId: number,
    tagId: number | null = null,
    cursor: number | null = null,
    limit?: number,
  ): Promise<CursorBasedPaginationDto<PostDto>> {
    return await this.postRepository.findMyPostsByTagId(
      userId,
      tagId,
      cursor,
      limit,
    );
  }

  async getPublicPostsByUserIdAndTagId(
    userId: number,
    tagId: number | null = null,
    cursor: number | null = null,
    limit?: number,
  ): Promise<CursorBasedPaginationDto<PostDto>> {
    return await this.postRepository.findPublicPostsByUserIdAndTagId(
      userId,
      tagId,
      cursor,
      limit,
    );
  }

  async updatePost(
    userId: number,
    postId: number,
    updatePostData: UpdatePostDataDto,
  ): Promise<PostDto> {
    const post = await this.postRepository.findPostById(postId);

    if (!post) {
      throw new NotFoundError();
    }

    if (post.userId !== userId) {
      throw new ForbiddenError();
    }

    return await this.postRepository.updatePost(postId, updatePostData);
  }

  async deletePost(userId: number, postId: number): Promise<void> {
    const post = await this.postRepository.findPostById(postId);

    if (!post) {
      throw new NotFoundError();
    }

    if (post.userId !== userId) {
      throw new ForbiddenError();
    }

    await this.postRepository.deletePost(postId);
  }
}
