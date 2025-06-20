import { Prisma } from "@prisma/client";
import {
  Education,
  EducationDegree,
} from "~/server/domain/aggregate/education";
import { EducationMediaMapper } from "./education-media.mapper";
import { SkillIdMapper } from "./skill-id.mapper";

type PrismaEducation = Prisma.EducationGetPayload<{
  include: {
    medias: true;
    skills: true;
  };
}>;

export class EducationMapper {
  static toDomain(education: PrismaEducation): Education {
    return new Education({
      id: education.id,
      schoolName: education.schoolName,
      degree: EducationDegree[education.degree],
      major: education.major,
      startedAt: education.startedAt,
      endedAt: education.endedAt,
      gpa: education.gpa ? Number(education.gpa) : null,
      activities: education.activities,
      description: education.description,
      createdAt: education.createdAt,
      updatedAt: education.updatedAt,
      medias: education.medias.map(EducationMediaMapper.toDomain),
      skillIds: education.skills.map((relation) =>
        SkillIdMapper.toDomain(relation.skillId),
      ),
    });
  }
}
