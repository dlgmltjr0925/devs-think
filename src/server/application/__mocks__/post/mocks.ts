import { CreatePostDataDto } from "../../dto/create-post-data.dto";

export const mockCreatePostData: Omit<CreatePostDataDto, "userId"> = {
  title: "test title",
  content: "test content",
  tags: ["test1", "test2", "test3"],
  thumbnailUrl: "test thumbnailUrl",
  cleanUrl: "test cleanUrl",
  isPublic: true,
  postDraftId: null,
};
