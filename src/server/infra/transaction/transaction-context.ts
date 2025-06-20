import { di } from "~/server/infra/di";
import { AsyncLocalStorage } from "async_hooks";
import { PRISMA_SERVICE, PrismaService } from "~/server/infra/database";

export class TransactionContext {
  private static storage = new AsyncLocalStorage<{ client: PrismaService }>();

  static hasContext() {
    return this.storage.getStore() !== undefined;
  }

  static get client() {
    return this.storage.getStore()?.client;
  }

  static async run<T>(fn: () => Promise<T>): Promise<T> {
    const client = di.resolve<PrismaService>(PRISMA_SERVICE);

    return await client.$transaction(async (tx) => {
      return await this.storage.run(
        { client: tx as PrismaService },
        async () => {
          return await fn();
        },
      );
    });
  }
}
