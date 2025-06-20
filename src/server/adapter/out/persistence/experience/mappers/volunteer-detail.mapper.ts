import { Prisma } from "@prisma/client";
import { VolunteerDetail } from "~/server/domain/aggregate/experience";

export class VolunteerDetailMapper {
  static toDomain(
    volunteerDetail: Prisma.VolunteerDetailGetPayload<object>,
  ): VolunteerDetail {
    return new VolunteerDetail({
      id: volunteerDetail.id,
      experienceId: volunteerDetail.experienceId,
      hours: volunteerDetail.hours,
      target: volunteerDetail.target,
      location: volunteerDetail.location,
    });
  }
}
