interface CareerAchievementConstructorArgs {
  id: number;
  careerId: number;
  description: string;
  metrics: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class CareerAchievement {
  id: number;
  careerId: number;
  description: string;
  metrics: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  constructor(args: CareerAchievementConstructorArgs) {
    this.id = args.id;
    this.careerId = args.careerId;
    this.description = args.description;
    this.metrics = args.metrics;
    this.createdAt = args.createdAt;
    this.updatedAt = args.updatedAt;
  }
}
