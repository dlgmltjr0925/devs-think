interface TagConstructorArgs {
  id: number;
  name: string;
}

export class Tag {
  readonly id: number;
  readonly name: string;

  constructor(args: TagConstructorArgs) {
    this.id = args.id;
    this.name = args.name;
  }
}
