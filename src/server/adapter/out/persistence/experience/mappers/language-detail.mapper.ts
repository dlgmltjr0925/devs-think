import { Prisma } from "@prisma/client";
import {
  LanguageDetail,
  LanguageLevel,
} from "~/server/domain/aggregate/experience";

export class LanguageDetailMapper {
  static toDomain(
    languageDetail: Prisma.LanguageDetailGetPayload<object>,
  ): LanguageDetail {
    return new LanguageDetail({
      id: languageDetail.id,
      experienceId: languageDetail.experienceId,
      language: languageDetail.language,
      testType: languageDetail.testType,
      score: languageDetail.score,
      level: languageDetail.level ? LanguageLevel[languageDetail.level] : null,
    });
  }
}
