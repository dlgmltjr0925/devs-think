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
    const prismaService = di.resolve<PrismaService>(PRISMA_SERVICE);

    return await prismaService.$transaction(async (tx) => {
      const client = tx as PrismaService;
      return await this.storage.run({ client }, async () => {
        return await fn();
      });
    });
  }
}
