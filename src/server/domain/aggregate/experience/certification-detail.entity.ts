interface CertificationDetailConstructorArgs {
  id: number;
  experienceId: number;
  certificationNumber: string | null;
  issuedBy: string | null;
  validUntil: Date | null;
}

export class CertificationDetail {
  id: number;
  experienceId: number;
  certificationNumber: string | null;
  issuedBy: string | null;
  validUntil: Date | null;

  constructor(args: CertificationDetailConstructorArgs) {
    this.id = args.id;
    this.experienceId = args.experienceId;
    this.certificationNumber = args.certificationNumber;
    this.issuedBy = args.issuedBy;
    this.validUntil = args.validUntil;
  }
}
