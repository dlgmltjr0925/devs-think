import { CreatePostDataDto } from "~/server/application/dto/create-post-data.dto";
import { PostRepository } from "~/server/application/port/out/repositories";
import { Post } from "~/server/domain/entities/post";
import { Inject, Injectable } from "~/server/infra/core";
import { PRISMA_SERVICE, PrismaService } from "~/server/infra/database";
import { PostMapper } from "./mappers/post.mapper";

@Injectable()
export class PostRepositoryAdapter implements PostRepository {
  constructor(
    @Inject(PRISMA_SERVICE) private readonly prismaService: PrismaService,
  ) {}

  async createPost(
    userId: number,
    createPostData: CreatePostDataDto,
  ): Promise<Post> {
    const tags = await this.findTagsIfNotExistsCreate(createPostData.tags);

    const createdPost = await this.prismaService.client.post.create({
      data: {
        userId,
        title: createPostData.title,
        content: createPostData.content,
        thumbnailUrl: createPostData.thumbnailUrl,
        cleanUrl: createPostData.cleanUrl,
        isPublic: createPostData.isPublic,
        postTagRelations: {
          createMany: { data: tags.map((tag) => ({ tagId: tag.id })) },
        },
      },
      include: {
        postTagRelations: {
          include: {
            tag: true,
          },
        },
      },
    });

    return PostMapper.toDomain(createdPost);
  }

  async findPostById(postId: number): Promise<Post | null> {
    const post = await this.prismaService.client.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        postTagRelations: {
          include: {
            tag: true,
          },
        },
      },
    });

    return post ? PostMapper.toDomain(post) : null;
  }

  private async findTagsIfNotExistsCreate(tags: string[]) {
    const existingTags = await this.prismaService.tag.findMany({
      where: {
        name: {
          in: tags,
        },
      },
    });

    const existingTagNames = existingTags.map((tag) => tag.name);

    const tagsToCreate = tags.filter((tag) => !existingTagNames.includes(tag));

    if (tagsToCreate.length === 0) {
      return existingTags;
    }

    const createdTags = await this.prismaService.client.tag.createManyAndReturn(
      {
        data: tagsToCreate.map((tag) => ({ name: tag })),
      },
    );

    return existingTags.concat(createdTags);
  }
}
