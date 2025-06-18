import { PostDraftRepository } from "~/server/application/port/out/repositories/post-draft.repository";
import { Inject, Injectable } from "~/server/infra/core";
import { PRISMA_SERVICE, PrismaService } from "~/server/infra/database";
import { PostDraftMapper } from "./mappers/post-draft.mapper";
import { PostDraft } from "~/server/domain/entities/post-draft";
import { CreatePostDraftDataDto } from "~/server/application/dto/create-post-draft-data.dto";

@Injectable()
export class PostDraftRepositoryAdapter implements PostDraftRepository {
  constructor(
    @Inject(PRISMA_SERVICE) private readonly prismaService: PrismaService,
  ) {}

  async createPostDraft(
    userId: number,
    createPostDraftData: CreatePostDraftDataDto,
  ): Promise<PostDraft> {
    const createdPostDraft = await this.prismaService.client.postDraft.create({
      data: {
        userId,
        postId: createPostDraftData.postId,
        title: createPostDraftData.title,
        content: createPostDraftData.content,
        tags: createPostDraftData.tags,
      },
    });

    return PostDraftMapper.toDomain(createdPostDraft);
  }

  async findPostDraftById(postDraftId: number): Promise<PostDraft | null> {
    const postDraft = await this.prismaService.client.postDraft.findUnique({
      where: {
        id: postDraftId,
        deletedAt: null,
      },
    });

    if (!postDraft) {
      return null;
    }

    return PostDraftMapper.toDomain(postDraft);
  }

  async deletePostDraft(postDraftId: number): Promise<void> {
    await this.prismaService.client.postDraft.update({
      where: {
        id: postDraftId,
        deletedAt: null,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
