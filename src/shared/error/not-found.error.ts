import { BaseError } from "./lib";

export class NotFoundError extends BaseError {
  static readonly message = "Not Found";

  constructor(data?: object) {
    super(NotFoundError.message, data);
  }
}
