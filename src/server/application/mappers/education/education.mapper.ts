import { Education } from "~/server/domain/aggregate/education";
import { EducationDto } from "../../dto/education.dto";
import { SkillDto } from "../../dto/skill.dto";
import { EducationMediaMapper } from "./education-media.mapper";

export class EducationMapper {
  static toDto(education: Education, skills: SkillDto[]): EducationDto {
    return {
      id: education.id,
      schoolName: education.schoolName,
      degree: education.degree,
      major: education.major,
      startedAt: education.startedAt,
      endedAt: education.endedAt,
      gpa: education.gpa,
      activities: education.activities,
      description: education.description,
      medias: education.medias.map((media) =>
        EducationMediaMapper.toDto(media),
      ),
      skills,
    };
  }
}
