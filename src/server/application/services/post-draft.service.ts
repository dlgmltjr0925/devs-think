import { Inject, Injectable } from "~/server/infra/core";
import {
  POST_DRAFT_REPOSITORY,
  type PostDraftRepository,
} from "../port/out/repositories";
import {
  CreatePostDraftUseCase,
  GetPostDraftUseCase,
} from "../port/in/post-draft";
import { CreatePostDraftDataDto } from "../dto/create-post-draft-data.dto";
import { PostDraftDto } from "../dto/post-draft.dto";
import { PostDraftMapper } from "../mappers/post-draft/post-draft.mapper";

@Injectable()
export class PostDraftService
  implements CreatePostDraftUseCase, GetPostDraftUseCase
{
  constructor(
    @Inject(POST_DRAFT_REPOSITORY)
    private readonly postDraftRepository: PostDraftRepository,
  ) {}

  async createPostDraft(
    userId: number,
    createPostDraftData: CreatePostDraftDataDto,
  ): Promise<PostDraftDto> {
    const postDraft = await this.postDraftRepository.createPostDraft(
      userId,
      createPostDraftData,
    );

    return PostDraftMapper.toDto(postDraft);
  }

  async getPostDraft(
    userId: number,
    postDraftId: number,
  ): Promise<PostDraftDto> {
    const postDraft =
      await this.postDraftRepository.findPostDraftById(postDraftId);

    if (!postDraft) {
      // TODO: No Content Error 처리
    }

    if (postDraft.userId !== userId) {
      // TODO: Forbidden Error 처리
    }

    return PostDraftMapper.toDto(postDraft);
  }
}
