import { beforeAll, describe, expect, it } from "vitest";
import {
  UPDATE_EXPERIENCE_USE_CASE,
  UpdateExperienceUseCase,
} from "./update-experience.use-case";
import {
  ExperienceTestFeature,
  mockCreateExperienceDataForNull,
} from "~/server/application/__mocks__/experience";
import { User } from "~/server/domain/aggregate/user";
import { di } from "~/server/infra/di";
import { UserTestFeature } from "~/server/application/__mocks__/user";
import { UpdateExperienceDataDto } from "~/server/application/dto/update-experience-data.dto";
import { test } from "~/server/infra/test";
import { SkillTestFeature } from "~/server/application/__mocks__/skill";

describe("UpdateExperienceUseCase", () => {
  let updateExperienceUseCase: UpdateExperienceUseCase;
  let experienceTestFeature: ExperienceTestFeature;
  let skillTestFeature: SkillTestFeature;
  let testUser: User;

  beforeAll(async () => {
    updateExperienceUseCase = di.resolve(UPDATE_EXPERIENCE_USE_CASE);
    experienceTestFeature = di.resolve(ExperienceTestFeature);
    skillTestFeature = di.resolve(SkillTestFeature);

    const userTestFeature = di.resolve(UserTestFeature);
    testUser = await userTestFeature.createTestUser();

    return () => {
      userTestFeature.deleteTestUser(testUser.id);
    };
  });

  it("should be defined", () => {
    expect(updateExperienceUseCase).toBeDefined();
  });

  describe("updateExperience", () => {
    test("업데이트 성공 - 데이터 없음 처리", async () => {
      // given
      const updateExperienceData: UpdateExperienceDataDto = {
        type: "Award",
        title: "updated test",
        organization: "updated test",
        description: "updated test",
        startedAt: new Date(),
        endedAt: null,
        isOngoing: false,
        url: "updated test",
        certificationDetail: null,
        awardDetail: null,
        languageDetail: null,
        volunteerDetail: null,
        medias: [],
        skillIds: [],
      };
      const createdExperience =
        await experienceTestFeature.createTestExperience(testUser.id);

      // when
      const updatedExperience = await updateExperienceUseCase.updateExperience(
        testUser.id,
        createdExperience.id,
        updateExperienceData,
      );

      // then
      expect(updatedExperience).toBeDefined();
      expect(updatedExperience.id).toBe(createdExperience.id);
      expect(updatedExperience.type).toBe(updateExperienceData.type);
      expect(updatedExperience.title).toBe(updateExperienceData.title);
      expect(updatedExperience.organization).toBe(
        updateExperienceData.organization,
      );
      expect(updatedExperience.description).toBe(
        updateExperienceData.description,
      );
      expect(updatedExperience.startedAt).toStrictEqual(
        updateExperienceData.startedAt,
      );
      expect(updatedExperience.endedAt).toBeNull();
      expect(updatedExperience.isOngoing).toBe(updateExperienceData.isOngoing);
      expect(updatedExperience.url).toBe(updateExperienceData.url);
      expect(updatedExperience.certificationDetail).toBeNull();
      expect(updatedExperience.awardDetail).toBeNull();
      expect(updatedExperience.languageDetail).toBeNull();
      expect(updatedExperience.volunteerDetail).toBeNull();
      expect(updatedExperience.medias).toStrictEqual([]);
      expect(updatedExperience.skills).toStrictEqual([]);
    });

    test("업데이트 성공 - 데이터 내용 업데이트", async () => {
      // given
      const skills = await Promise.all([
        skillTestFeature.createTestSkill(testUser.id, "test1"),
        skillTestFeature.createTestSkill(testUser.id, "test2"),
      ]);

      const updateExperienceData: UpdateExperienceDataDto = {
        type: "Award",
        title: "updated test",
        organization: "updated test",
        description: "updated test",
        startedAt: new Date(),
        endedAt: null,
        isOngoing: false,
        url: "updated test",
        certificationDetail: {
          certificationNumber: "updated test",
          issuedBy: "updated test",
          validUntil: new Date(),
        },
        awardDetail: {
          rank: "updated test",
          prize: "updated test",
          category: "updated test",
        },
        languageDetail: {
          language: "updated test",
          testType: "updated test",
          score: "updated test",
          level: "Advanced",
        },
        volunteerDetail: {
          hours: 10,
          target: "updated test",
          location: "updated test",
        },
        medias: [
          {
            type: "Image",
            url: "updated test",
            title: "updated test",
            description: "updated test",
          },
        ],
        skillIds: skills.map((skill) => skill.id),
      };
      const createdExperience =
        await experienceTestFeature.createTestExperience(testUser.id);

      // when
      const updatedExperience = await updateExperienceUseCase.updateExperience(
        testUser.id,
        createdExperience.id,
        updateExperienceData,
      );

      // then
      expect(updatedExperience).toBeDefined();
      expect(updatedExperience.id).toBe(createdExperience.id);
      expect(updatedExperience.type).toBe(updateExperienceData.type);
      expect(updatedExperience.title).toBe(updateExperienceData.title);
      expect(updatedExperience.organization).toBe(
        updateExperienceData.organization,
      );
      expect(updatedExperience.description).toBe(
        updateExperienceData.description,
      );
      expect(updatedExperience.startedAt).toStrictEqual(
        updateExperienceData.startedAt,
      );
      expect(updatedExperience.endedAt).toBeNull();
      expect(updatedExperience.isOngoing).toBe(updateExperienceData.isOngoing);
      expect(updatedExperience.url).toBe(updateExperienceData.url);

      if (!updatedExperience.certificationDetail) {
        throw new Error("certificationDetail not found");
      }

      expect(updatedExperience.certificationDetail.id).toBeDefined();
      expect(updatedExperience.certificationDetail.certificationNumber).toBe(
        updateExperienceData.certificationDetail!.certificationNumber,
      );
      expect(updatedExperience.certificationDetail.issuedBy).toBe(
        updateExperienceData.certificationDetail!.issuedBy,
      );
      expect(updatedExperience.certificationDetail.validUntil).toStrictEqual(
        updateExperienceData.certificationDetail!.validUntil,
      );

      if (!updatedExperience.awardDetail) {
        throw new Error("awardDetail not found");
      }

      expect(updatedExperience.awardDetail.id).toBeDefined();
      expect(updatedExperience.awardDetail.rank).toBe(
        updateExperienceData.awardDetail!.rank,
      );
      expect(updatedExperience.awardDetail.prize).toBe(
        updateExperienceData.awardDetail!.prize,
      );
      expect(updatedExperience.awardDetail.category).toBe(
        updateExperienceData.awardDetail!.category,
      );

      if (!updatedExperience.languageDetail) {
        throw new Error("languageDetail not found");
      }

      expect(updatedExperience.languageDetail.id).toBeDefined();
      expect(updatedExperience.languageDetail.language).toBe(
        updateExperienceData.languageDetail!.language,
      );
      expect(updatedExperience.languageDetail.testType).toBe(
        updateExperienceData.languageDetail!.testType,
      );
      expect(updatedExperience.languageDetail.score).toBe(
        updateExperienceData.languageDetail!.score,
      );
      expect(updatedExperience.languageDetail.level).toBe(
        updateExperienceData.languageDetail!.level,
      );

      if (!updatedExperience.volunteerDetail) {
        throw new Error("volunteerDetail not found");
      }

      expect(updatedExperience.volunteerDetail.id).toBeDefined();
      expect(updatedExperience.volunteerDetail.hours).toBe(
        updateExperienceData.volunteerDetail!.hours,
      );
      expect(updatedExperience.volunteerDetail.target).toBe(
        updateExperienceData.volunteerDetail!.target,
      );
      expect(updatedExperience.volunteerDetail.location).toBe(
        updateExperienceData.volunteerDetail!.location,
      );

      updatedExperience.medias.forEach((media) => {
        const matchedMedia = updateExperienceData.medias.find(
          (m) => m.title === media.title,
        );
        if (!matchedMedia) {
          throw new Error("matchedMedia is null");
        }
        expect(media.id).toBeDefined();
        expect(media.type).toBe(matchedMedia.type);
        expect(media.url).toBe(matchedMedia.url);
        expect(media.title).toBe(matchedMedia.title);
        expect(media.description).toBe(matchedMedia.description);
      });

      expect(
        updatedExperience.skills.map((skill) => skill.id).sort(),
      ).toStrictEqual(skills.map((skill) => skill.id).sort());
    });

    test("업데이트 성공 - 데이터 추가 처리", async () => {
      // given
      const skills = await Promise.all([
        skillTestFeature.createTestSkill(testUser.id, "test1"),
        skillTestFeature.createTestSkill(testUser.id, "test2"),
      ]);

      const updateExperienceData: UpdateExperienceDataDto = {
        type: "Award",
        title: "updated test",
        organization: "updated test",
        description: "updated test",
        startedAt: new Date(),
        endedAt: null,
        isOngoing: false,
        url: "updated test",
        certificationDetail: {
          certificationNumber: "updated test",
          issuedBy: "updated test",
          validUntil: new Date(),
        },
        awardDetail: {
          rank: "updated test",
          prize: "updated test",
          category: "updated test",
        },
        languageDetail: {
          language: "updated test",
          testType: "updated test",
          score: "updated test",
          level: "Advanced",
        },
        volunteerDetail: {
          hours: 10,
          target: "updated test",
          location: "updated test",
        },
        medias: [
          {
            type: "Image",
            url: "updated test",
            title: "updated test",
            description: "updated test",
          },
        ],
        skillIds: skills.map((skill) => skill.id),
      };

      const createdExperience =
        await experienceTestFeature.createTestExperience(testUser.id, {
          ...mockCreateExperienceDataForNull,
          skillIds: skills.map((skill) => skill.id),
        });

      // when
      const updatedExperience = await updateExperienceUseCase.updateExperience(
        testUser.id,
        createdExperience.id,
        updateExperienceData,
      );

      // then
      expect(updatedExperience).toBeDefined();
      expect(updatedExperience.id).toBe(createdExperience.id);
      expect(updatedExperience.type).toBe(updateExperienceData.type);
      expect(updatedExperience.title).toBe(updateExperienceData.title);
      expect(updatedExperience.organization).toBe(
        updateExperienceData.organization,
      );
      expect(updatedExperience.description).toBe(
        updateExperienceData.description,
      );
      expect(updatedExperience.startedAt).toStrictEqual(
        updateExperienceData.startedAt,
      );
      expect(updatedExperience.endedAt).toBeNull();
      expect(updatedExperience.isOngoing).toBe(updateExperienceData.isOngoing);
      expect(updatedExperience.url).toBe(updateExperienceData.url);

      if (!updatedExperience.certificationDetail) {
        throw new Error("certificationDetail not found");
      }

      expect(updatedExperience.certificationDetail.id).toBeDefined();
      expect(updatedExperience.certificationDetail.certificationNumber).toBe(
        updateExperienceData.certificationDetail!.certificationNumber,
      );
      expect(updatedExperience.certificationDetail.issuedBy).toBe(
        updateExperienceData.certificationDetail!.issuedBy,
      );
      expect(updatedExperience.certificationDetail.validUntil).toStrictEqual(
        updateExperienceData.certificationDetail!.validUntil,
      );

      if (!updatedExperience.awardDetail) {
        throw new Error("awardDetail not found");
      }

      expect(updatedExperience.awardDetail.id).toBeDefined();
      expect(updatedExperience.awardDetail.rank).toBe(
        updateExperienceData.awardDetail!.rank,
      );
      expect(updatedExperience.awardDetail.prize).toBe(
        updateExperienceData.awardDetail!.prize,
      );
      expect(updatedExperience.awardDetail.category).toBe(
        updateExperienceData.awardDetail!.category,
      );

      if (!updatedExperience.languageDetail) {
        throw new Error("languageDetail not found");
      }

      expect(updatedExperience.languageDetail.id).toBeDefined();
      expect(updatedExperience.languageDetail.language).toBe(
        updateExperienceData.languageDetail!.language,
      );
      expect(updatedExperience.languageDetail.testType).toBe(
        updateExperienceData.languageDetail!.testType,
      );
      expect(updatedExperience.languageDetail.score).toBe(
        updateExperienceData.languageDetail!.score,
      );
      expect(updatedExperience.languageDetail.level).toBe(
        updateExperienceData.languageDetail!.level,
      );

      if (!updatedExperience.volunteerDetail) {
        throw new Error("volunteerDetail not found");
      }

      expect(updatedExperience.volunteerDetail.id).toBeDefined();
      expect(updatedExperience.volunteerDetail.hours).toBe(
        updateExperienceData.volunteerDetail!.hours,
      );
      expect(updatedExperience.volunteerDetail.target).toBe(
        updateExperienceData.volunteerDetail!.target,
      );
      expect(updatedExperience.volunteerDetail.location).toBe(
        updateExperienceData.volunteerDetail!.location,
      );

      updatedExperience.medias.forEach((media) => {
        const matchedMedia = updateExperienceData.medias.find(
          (m) => m.title === media.title,
        );
        if (!matchedMedia) {
          throw new Error("matchedMedia is null");
        }
        expect(media.id).toBeDefined();
        expect(media.type).toBe(matchedMedia.type);
        expect(media.url).toBe(matchedMedia.url);
        expect(media.title).toBe(matchedMedia.title);
        expect(media.description).toBe(matchedMedia.description);
      });

      expect(
        updatedExperience.skills.map((skill) => skill.id).sort(),
      ).toStrictEqual(skills.map((skill) => skill.id).sort());
    });
  });
});
