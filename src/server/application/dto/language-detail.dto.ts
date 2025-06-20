import { LanguageLevelDto } from "./language-level.dto";

export class LanguageDetailDto {
  id: number;
  experienceId: number;
  language: string;
  testType: string | null;
  score: string | null;
  level: LanguageLevelDto | null;
}
