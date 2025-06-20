import { CreatePostDataDto } from "~/server/application/dto/create-post-data.dto";
import { PostRepository } from "~/server/application/port/out/repositories";
import { Post } from "~/server/domain/entities/post";
import { Inject, Injectable } from "~/server/infra/core";
import { PRISMA_SERVICE, PrismaService } from "~/server/infra/database";

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

    const createdPost = await this.prismaService.post.create({
      data: {
        userId,
        title: createPostData.title,
        content: createPostData.content,
        postTagRelations: {
          connectOrCreate: tags.map((tag) => ({
            where: { tagId: tag.id },
            create: { tagId: tag.id },
          })),
        },
      },
    });
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

    const createdTags = await this.prismaService.tag.createManyAndReturn({
      data: tagsToCreate.map((tag) => ({ name: tag })),
    });

    return existingTags.concat(createdTags);
  }
}
