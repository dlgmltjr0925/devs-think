import { LanguageDetail } from "~/server/domain/aggregate/experience";
import { LanguageDetailDto } from "../../dto/language-detail.dto";

export class LanguageDetailMapper {
  static toDto(languageDetail: LanguageDetail): LanguageDetailDto {
    return {
      id: languageDetail.id,
      experienceId: languageDetail.experienceId,
      language: languageDetail.language,
      level: languageDetail.level,
      testType: languageDetail.testType,
      score: languageDetail.score,
    };
  }
}
