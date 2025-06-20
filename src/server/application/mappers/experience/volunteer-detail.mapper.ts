import { VolunteerDetail } from "~/server/domain/aggregate/experience";
import { VolunteerDetailDto } from "../../dto/volunteer-detail.dto";

export class VolunteerDetailMapper {
  static toDto(volunteerDetail: VolunteerDetail): VolunteerDetailDto {
    return {
      id: volunteerDetail.id,
      experienceId: volunteerDetail.experienceId,
      hours: volunteerDetail.hours,
      target: volunteerDetail.target,
      location: volunteerDetail.location,
    };
  }
}
