import { LanguageLevelDto } from "./language-level.dto";

export class CreateLanguageDetailDataDto {
  language: string;
  testType: string | null;
  score: string | null;
  level: LanguageLevelDto | null;
}
