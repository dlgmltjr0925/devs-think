import { LanguageLevelDto } from "./language-level.dto";

export class UpdateLanguageDetailDataDto {
  language: string;
  testType: string | null;
  score: string | null;
  level: LanguageLevelDto | null;
}
