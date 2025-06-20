import { Inject, Injectable } from "~/server/infra/core";
import {
  EXPERIENCE_REPOSITORY,
  type ExperienceRepository,
} from "../../port/out/repositories";
import { Experience } from "~/server/domain/aggregate/experience";
import { SkillTestFeature } from "../skill";
import { mockCreateExperienceData } from "./mocks";

@Injectable()
export class ExperienceTestFeature {
  constructor(
    @Inject(EXPERIENCE_REPOSITORY)
    private readonly experienceRepository: ExperienceRepository,
    @Inject(SkillTestFeature)
    private readonly skillTestFeature: SkillTestFeature,
  ) {}

  async createTestExperience(userId: number): Promise<Experience> {
    const skills = await Promise.all([
      this.skillTestFeature.createTestSkill(userId, "react"),
      this.skillTestFeature.createTestSkill(userId, "next.js"),
    ]);

    return this.experienceRepository.createExperience(userId, {
      ...mockCreateExperienceData,
      skillIds: skills.map((skill) => skill.id),
    });
  }

  async createTestExperiences(userId: number): Promise<Experience[]> {
    const skills = await Promise.all([
      this.skillTestFeature.createTestSkill(userId, "react"),
      this.skillTestFeature.createTestSkill(userId, "next.js"),
      this.skillTestFeature.createTestSkill(userId, "nest.js"),
    ]);

    return Promise.all([
      this.experienceRepository.createExperience(userId, {
        ...mockCreateExperienceData,
        skillIds: skills.slice(0, 2).map((skill) => skill.id),
      }),
      this.experienceRepository.createExperience(userId, {
        ...mockCreateExperienceData,
        skillIds: skills.slice(1, 3).map((skill) => skill.id),
      }),
    ]);
  }
}
