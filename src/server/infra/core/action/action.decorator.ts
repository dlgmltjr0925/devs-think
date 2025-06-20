/* eslint-disable @typescript-eslint/no-explicit-any */
import "reflect-metadata";
import { BaseError } from "~/shared/error";
import { ActionLogger } from "~/server/infra/core/logger";
import { injectable } from "tsyringe";
import { instanceToPlain } from "class-transformer";

type Constructor<T = object> = new (...args: any[]) => T;

const throwErrorToResponse = (error: unknown) => {
  // 예상된 Internal Error 인 경우 예외를 던진다.
  // if (DataIntegrityError.equals(error)) {
  //   throw error;
  // }

  if (error instanceof BaseError) {
    return { error: error.json };
  }
  throw error;
};

const wrapMethod = (target: any, methodName: string, originalMethod: any) => {
  Object.defineProperty(target, methodName, {
    value: async function (...args: any[]) {
      const log = ActionLogger.log(methodName);
      try {
        const result = await originalMethod.apply(this, args);
        log();
        return instanceToPlain(result);
      } catch (error: unknown) {
        log(error as Error);
        return throwErrorToResponse(error);
      }
    },
    configurable: true,
    writable: true,
  });
};

export function Action<T extends Constructor>(target: T) {
  const methodNames = Object.getOwnPropertyNames(target.prototype);
  methodNames.forEach((methodName) => {
    const descriptor = Object.getOwnPropertyDescriptor(
      target.prototype,
      methodName,
    );

    if (
      descriptor &&
      typeof descriptor.value === "function" &&
      methodName !== "constructor"
    ) {
      const originalMethod = descriptor.value;
      wrapMethod(target.prototype, methodName, originalMethod);
    }
  });

  const Target = class extends target {
    constructor(...args: any[]) {
      super(...args);

      const methodNames = Object.getOwnPropertyNames(target.prototype);
      methodNames.forEach((methodName) => {
        if (
          methodName !== "constructor" &&
          typeof this[methodName as keyof typeof this] === "function"
        ) {
          const method = this[methodName as keyof typeof this] as any;
          this[methodName as keyof typeof this] = method.bind(this);
        }
      });
    }
  };

  injectable()(Target);

  return Target;
}
