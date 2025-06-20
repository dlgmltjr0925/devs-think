interface VolunteerDetailConstructorArgs {
  id: number;
  experienceId: number;
  hours: number | null;
  target: string | null;
  location: string | null;
}

export class VolunteerDetail {
  id: number;
  experienceId: number;
  hours: number | null;
  target: string | null;
  location: string | null;

  constructor(args: VolunteerDetailConstructorArgs) {
    this.id = args.id;
    this.experienceId = args.experienceId;
    this.hours = args.hours;
    this.target = args.target;
    this.location = args.location;
  }
}
