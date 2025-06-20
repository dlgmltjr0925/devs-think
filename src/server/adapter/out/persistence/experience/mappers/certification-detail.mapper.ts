import { Prisma } from "@prisma/client";
import { CertificationDetail } from "~/server/domain/aggregate/experience";

export class CertificationDetailMapper {
  static toDomain(
    certificationDetail: Prisma.CertificationDetailGetPayload<object>,
  ): CertificationDetail {
    return new CertificationDetail({
      id: certificationDetail.id,
      experienceId: certificationDetail.experienceId,
      certificationNumber: certificationDetail.certificationNumber,
      issuedBy: certificationDetail.issuedBy,
      validUntil: certificationDetail.validUntil,
    });
  }
}
