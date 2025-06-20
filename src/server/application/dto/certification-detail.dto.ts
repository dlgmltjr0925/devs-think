export class CertificationDetailDto {
  id: number;
  experienceId: number;
  certificationNumber: string | null;
  issuedBy: string | null;
  validUntil: Date | null;
}
