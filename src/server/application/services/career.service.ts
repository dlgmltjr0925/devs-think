import { Inject, Injectable } from "~/server/infra/core";
import { CreateCareerUseCase, GetCareerUseCase } from "../port/in/career";
import { CreateCareerDataDto } from "../dto/create-career-data.dto";
import { CareerDto } from "../dto/career.dto";
import {
  CAREER_REPOSITORY,
  type CareerRepository,
} from "../port/out/repositories";
import { CareerMapper } from "../mappers/career";

@Injectable()
export class CareerService implements CreateCareerUseCase, GetCareerUseCase {
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

  async getCareer(careerId: number): Promise<CareerDto | null> {
    const career = await this.careerRepository.findCareerById(careerId);

    if (!career) {
      return null;
    }

    return CareerMapper.toDto(career);
  }

  async getCareersByUserId(userId: number): Promise<CareerDto[]> {
    const careers = await this.careerRepository.findCareersByUserId(userId);

    return careers.map(CareerMapper.toDto);
  }
}
