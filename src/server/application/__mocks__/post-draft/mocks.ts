import { CreatePostDraftDataDto } from "~/server/application/dto/create-post-draft-data.dto";

export const mockCreatePostDraftData: CreatePostDraftDataDto = {
  postId: null,
  title: "test title",
  content: "test content",
  tags: ["test"],
};
