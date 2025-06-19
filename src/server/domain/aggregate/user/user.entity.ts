interface UserConstructorArgs {
  id: number;
  name: string;
  email: string;
  image: string;
}

export class User {
  readonly id: number;
  readonly name: string;
  readonly email: string;
  readonly image: string;

  constructor(args: UserConstructorArgs) {
    this.id = args.id;
    this.name = args.name;
    this.email = args.email;
    this.image = args.image;
  }
}
