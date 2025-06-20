import { TransactionContext } from "./transaction-context";

export const withTransaction = async (
  fn: (...args: unknown[]) => unknown | Promise<unknown>,
) => {
  return async function () {
    await TransactionContext.run(async () => {
      return await fn();
    });
  };
};
