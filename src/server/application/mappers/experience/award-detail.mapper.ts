import { AwardDetail } from "~/server/domain/aggregate/experience";
import { AwardDetailDto } from "../../dto/award-detail.dto";

export class AwardDetailMapper {
  static toDto(awardDetail: AwardDetail): AwardDetailDto {
    return {
      id: awardDetail.id,
      experienceId: awardDetail.experienceId,
      rank: awardDetail.rank,
      prize: awardDetail.prize,
      category: awardDetail.category,
    };
  }
}
