import { test, TestOptions } from "vitest";
import { TransactionContext } from "../transaction/transaction-context";

export const testWithTransaction = (
  name: string,
  fn: () => void | Promise<void>,
  options?: TestOptions,
) => {
  const fnWithTransaction = async () => {
    try {
      await TransactionContext.run(async () => {
        await fn();
        throw new Error("Rollback for testing");
      });
    } catch (error) {
      if (error instanceof Error && error.message === "Rollback for testing") {
        return void 0;
      }
      throw error;
    }
  };
  test(name, fnWithTransaction, options);
};
