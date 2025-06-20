import { TransactionContext } from "./transaction-context";

export function transactional() {
  return function (
    target: unknown,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: unknown[]) {
      if (TransactionContext.hasContext()) {
        return await originalMethod.apply(this, args);
      }

      return await TransactionContext.run(() =>
        originalMethod.apply(this, args),
      );
    };

    return descriptor;
  };
}
