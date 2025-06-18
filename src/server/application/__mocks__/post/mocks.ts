import { CreatePostDataDto } from "../../dto/create-post-data.dto";

export const mockCreatePostData: Omit<CreatePostDataDto, "userId"> = {
  title: "test title",
  content: "test content",
  tags: ["test"],
  thumbnailUrl: "test thumbnailUrl",
  cleanUrl: "test cleanUrl",
  isPublic: true,
  postDraftId: null,
};
