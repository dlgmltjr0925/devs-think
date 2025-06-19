export class CareerAchievementDto {
  id: number;
  careerId: number;
  description: string;
  metrics: string | null;
  createdAt: Date;
  updatedAt: Date;
}
