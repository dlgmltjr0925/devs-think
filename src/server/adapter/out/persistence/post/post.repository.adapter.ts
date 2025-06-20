import { CreatePostDataDto } from "~/server/application/dto/create-post-data.dto";
import { PostRepository } from "~/server/application/port/out/repositories";
import { Post } from "~/server/domain/entities/post";
import { Inject, Injectable } from "~/server/infra/core";
import { PRISMA_SERVICE, PrismaService } from "~/server/infra/database";
import { PostMapper } from "./mappers/post.mapper";
import { CursorBasedPaginationDto } from "~/server/application/dto/cursor-based-pagination.dto";
import { Prisma } from "@prisma/client";
import { UpdatePostDataDto } from "~/server/application/dto/update-post-data.dto";

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
        deletedAt: null,
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

  findMyPostsByTagId(
    userId: number,
    tagId: number | null,
    cursor: number | null,
    limit: number,
  ): Promise<CursorBasedPaginationDto<Post>> {
    return this.findPosts(userId, tagId, null, cursor, limit);
  }

  findPublicPostsByUserIdAndTagId(
    userId: number,
    tagId: number | null,
    cursor: number | null,
    limit: number,
  ): Promise<CursorBasedPaginationDto<Post>> {
    return this.findPosts(userId, tagId, true, cursor, limit);
  }

  private async findPosts(
    userId: number,
    tagId: number | null,
    isPublic: boolean | null,
    cursor: number | null,
    limit: number = 20,
  ): Promise<CursorBasedPaginationDto<Post>> {
    const where: Prisma.PostWhereInput = {
      userId,
      deletedAt: null,
    };

    if (tagId) {
      where.postTagRelations = {
        some: { tagId },
      };
    }

    if (isPublic) {
      where.isPublic = true;
    }

    const [totalCount, posts] = await Promise.all([
      this.prismaService.client.post.count({ where }),
      this.prismaService.client.post.findMany({
        where,
        orderBy: {
          id: "desc",
        },
        cursor: cursor ? { id: cursor } : undefined,
        take: limit + 1,
        include: {
          postTagRelations: {
            include: {
              tag: true,
            },
          },
        },
      }),
    ]);

    const data = posts.slice(0, limit).map(PostMapper.toDomain);
    const hasNext = posts.length > limit;
    const nextCursor = hasNext ? posts[posts.length - 1].id : null;
    const hasPrev = cursor ? true : false;
    const prevCursor = cursor ? cursor : null;

    return {
      data,
      totalCount,
      nextCursor,
      prevCursor,
      hasNext,
      hasPrev,
    };
  }

  async updatePost(
    postId: number,
    updatePostData: UpdatePostDataDto,
  ): Promise<Post> {
    const tags = await this.findTagsIfNotExistsCreate(updatePostData.tags);

    const updatedPost = await this.prismaService.client.post.update({
      where: { id: postId },
      data: {
        title: updatePostData.title,
        content: updatePostData.content,
        thumbnailUrl: updatePostData.thumbnailUrl,
        cleanUrl: updatePostData.cleanUrl,
        isPublic: updatePostData.isPublic,
        postTagRelations: {
          deleteMany: {},
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

    return PostMapper.toDomain(updatedPost);
  }

  async deletePost(postId: number): Promise<void> {
    await this.prismaService.client.post.update({
      where: { id: postId },
      data: { deletedAt: new Date() },
    });
  }
}
