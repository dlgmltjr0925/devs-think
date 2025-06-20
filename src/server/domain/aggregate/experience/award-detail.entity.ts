interface AwardDetailConstructorArgs {
  id: number;
  experienceId: number;
  rank: string | null;
  prize: string | null;
  category: string | null;
}

export class AwardDetail {
  id: number;
  experienceId: number;
  rank: string | null;
  prize: string | null;
  category: string | null;

  constructor(args: AwardDetailConstructorArgs) {
    this.id = args.id;
    this.experienceId = args.experienceId;
    this.rank = args.rank;
    this.prize = args.prize;
    this.category = args.category;
  }
}
