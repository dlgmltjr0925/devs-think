import { Inject, Injectable } from "~/server/infra/core";
import {
  CAREER_REPOSITORY,
  type CareerRepository,
} from "../../port/out/repositories";
import { mockCreateCareerDataDto } from "./mocks";
import { Career } from "~/server/domain/aggregate/career";

@Injectable()
export class CareerTestFeature {
  constructor(
    @Inject(CAREER_REPOSITORY)
    private readonly careerRepository: CareerRepository,
  ) {}

  async createTestCareer(userId: number): Promise<Career> {
    const career = await this.careerRepository.createCareer(
      userId,
      mockCreateCareerDataDto,
    );

    return career;
  }
}
