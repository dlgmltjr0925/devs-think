import { Inject, Injectable } from "~/server/infra/core";
import {
  POST_REPOSITORY,
  type PostRepository,
} from "../../port/out/repositories";
import { Post } from "~/server/domain/aggregate/post";
import { mockCreatePostData } from "./mocks";

@Injectable()
export class PostTestFeature {
  constructor(
    @Inject(POST_REPOSITORY)
    private readonly postRepository: PostRepository,
  ) {}

  async createTestPost(userId: number): Promise<Post> {
    return this.postRepository.createPost(userId, mockCreatePostData);
  }

  async createTestPrivatePost(userId: number): Promise<Post> {
    return this.postRepository.createPost(userId, {
      ...mockCreatePostData,
      isPublic: false,
    });
  }
}
