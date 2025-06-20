import { CertificationDetail } from "~/server/domain/aggregate/experience";
import { CertificationDetailDto } from "../../dto/certification-detail.dto";

export class CertificationDetailMapper {
  static toDto(
    certificationDetail: CertificationDetail,
  ): CertificationDetailDto {
    return {
      id: certificationDetail.id,
      experienceId: certificationDetail.experienceId,
      certificationNumber: certificationDetail.certificationNumber,
      issuedBy: certificationDetail.issuedBy,
      validUntil: certificationDetail.validUntil,
    };
  }
}
