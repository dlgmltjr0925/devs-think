import { TransactionContext } from "./transaction-context";

export const withTransaction = (
  fn: (...args: unknown[]) => unknown | Promise<unknown>,
): ((...args: unknown[]) => Promise<unknown>) => {
  return async function (...args: unknown[]) {
    await TransactionContext.run(async () => {
      return await fn(...args);
    });
  };
};
