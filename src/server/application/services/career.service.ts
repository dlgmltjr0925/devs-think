import { Inject, Injectable } from "~/server/infra/core";
import {
  CreateCareerUseCase,
  GetCareerUseCase,
  UpdateCareerUseCase,
} from "../port/in/career";
import { CreateCareerDataDto } from "../dto/create-career-data.dto";
import { UpdateCareerDataDto } from "../dto/update-career-data.dto";
import { CareerDto } from "../dto/career.dto";
import {
  CAREER_REPOSITORY,
  type CareerRepository,
} from "../port/out/repositories";
import { CareerMapper } from "../mappers/career";
import { ForbiddenError } from "~/shared/error/forbidden.error";
import { NotFoundError } from "~/shared/error/not-found.error";

@Injectable()
export class CareerService
  implements CreateCareerUseCase, GetCareerUseCase, UpdateCareerUseCase
{
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

  async updateCareer(
    userId: number,
    careerId: number,
    updateCareerData: UpdateCareerDataDto,
  ): Promise<CareerDto> {
    const career = await this.careerRepository.findCareerById(careerId);

    if (!career) {
      throw new NotFoundError();
    }

    if (career.userId !== userId) {
      throw new ForbiddenError();
    }

    const updatedCareer = await this.careerRepository.updateCareer(
      careerId,
      updateCareerData,
    );

    return CareerMapper.toDto(updatedCareer);
  }
}
