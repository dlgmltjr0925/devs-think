export class BaseError extends Error {
  static message = "Internal Server Error";

  static equals(error: unknown | Error) {
    if (error instanceof Error) {
      const message = error.message.startsWith("{")
        ? JSON.parse(error.message).message
        : error.message;
      return message.startsWith(this.message) || this.message === message;
    }
    return false;
  }

  static getData<T extends object>(error: unknown | Error): T | null {
    if (error instanceof Error && error.message.startsWith("{")) {
      return JSON.parse(error.message).data as T;
    }
    return null;
  }

  constructor(message: string, data?: object) {
    super(data ? JSON.stringify({ message, data }) : message);
  }

  get json() {
    if (this.message.startsWith("{")) {
      return JSON.parse(this.message);
    }

    return {
      message: this.message,
    };
  }
}
