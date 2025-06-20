import { Inject, Injectable } from "~/server/infra/core";
import {
  EDUCATION_REPOSITORY,
  type EducationRepository,
} from "../../port/out/repositories";
import { Education } from "~/server/domain/aggregate/education";
import { mockCreateEducationData } from "./mocks";
import { SkillTestFeature } from "../skill";

@Injectable()
export class EducationTestFeature {
  constructor(
    @Inject(EDUCATION_REPOSITORY)
    private readonly educationRepository: EducationRepository,
    @Inject(SkillTestFeature)
    private readonly skillTestFeature: SkillTestFeature,
  ) {}

  async createTestEducation(userId: number): Promise<Education> {
    const skills = await Promise.all([
      this.skillTestFeature.createTestSkill(userId, "Skill 1"),
      this.skillTestFeature.createTestSkill(userId, "Skill 2"),
    ]);

    return this.educationRepository.createEducation(userId, {
      ...mockCreateEducationData,
      skillIds: skills.map((skill) => skill.id),
    });
  }
}
