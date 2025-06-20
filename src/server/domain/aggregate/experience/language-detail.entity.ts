import { LanguageLevel } from "./language-level.enum";

interface LanguageDetailConstructorArgs {
  id: number;
  experienceId: number;
  language: string;
  testType: string | null;
  score: string | null;
  level: LanguageLevel | null;
}
export class LanguageDetail {
  id: number;
  experienceId: number;
  language: string;
  testType: string | null;
  score: string | null;
  level: LanguageLevel | null;

  constructor(args: LanguageDetailConstructorArgs) {
    this.id = args.id;
    this.experienceId = args.experienceId;
    this.language = args.language;
    this.testType = args.testType;
    this.score = args.score;
    this.level = args.level;
  }
}
