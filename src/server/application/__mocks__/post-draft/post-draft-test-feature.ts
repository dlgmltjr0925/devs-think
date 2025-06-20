import {
  POST_DRAFT_REPOSITORY,
  type PostDraftRepository,
} from "~/server/application/port/out/repositories";
import { PostDraft } from "~/server/domain/aggregate/post-draft";
import { Inject, Injectable } from "~/server/infra/core";
import { mockCreatePostDraftData } from "./mocks";

@Injectable()
export class PostDraftTestFeature {
  constructor(
    @Inject(POST_DRAFT_REPOSITORY)
    private readonly postDraftRepository: PostDraftRepository,
  ) {}

  async createTestPostDraft(userId: number): Promise<PostDraft> {
    return this.postDraftRepository.createPostDraft(
      userId,
      mockCreatePostDraftData,
    );
  }

  async getPostDraft(postDraftId: number): Promise<PostDraft | null> {
    return this.postDraftRepository.findPostDraftById(postDraftId);
  }

  async deleteTestPostDraft(postDraftId: number): Promise<void> {
    await this.postDraftRepository.deletePostDraft(postDraftId);
  }
}
