import { BaseError } from "./lib";

export class NoContentError extends BaseError {
  static message = "No content";

  constructor(data?: object) {
    super(NoContentError.message, data);
  }
}
