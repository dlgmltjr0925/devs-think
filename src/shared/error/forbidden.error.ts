import { BaseError } from "./lib";

export class ForbiddenError extends BaseError {
  static message = "Forbidden";

  constructor(data?: object) {
    super(ForbiddenError.message, data);
  }
}
