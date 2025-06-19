import { Inject, Injectable } from "~/server/infra/core";
import { CreateCareerUseCase } from "../port/in/career";
import { CreateCareerDataDto } from "../dto/create-career-data.dto";
import { CareerDto } from "../dto/career.dto";
import {
  CAREER_REPOSITORY,
  type CareerRepository,
} from "../port/out/repositories";
import { CareerMapper } from "../mappers/career";

@Injectable()
export class CareerService implements CreateCareerUseCase {
  constructor(
    @Inject(CAREER_REPOSITORY)
    private readonly careerRepository: CareerRepository,
  ) {}

  async createCareer(
    userId: number,
    createCareerData: CreateCareerDataDto,
  ): Promise<CareerDto> {
    const career = await this.careerRepository.createCareer(
      userId,
      createCareerData,
    );

    return CareerMapper.toDto(career);
  }
}
