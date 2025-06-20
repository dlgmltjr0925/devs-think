import { Prisma } from "@prisma/client";
import { AwardDetail } from "~/server/domain/aggregate/experience";

export class AwardDetailMapper {
  static toDomain(
    awardDetail: Prisma.AwardDetailGetPayload<object>,
  ): AwardDetail {
    return new AwardDetail({
      id: awardDetail.id,
      experienceId: awardDetail.experienceId,
      rank: awardDetail.rank,
      prize: awardDetail.prize,
      category: awardDetail.category,
    });
  }
}
