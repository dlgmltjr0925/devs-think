import { PrismaClient } from "@prisma/client";
import { Injectable } from "~/server/infra/core";
import { TransactionContext } from "../transaction/transaction-context";

export const PRISMA_SERVICE = Symbol.for("PrismaService");

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      log:
        process.env.NODE_ENV === "development"
          ? ["query", "error", "warn"]
          : ["error"],
    });

    this.onModuleInit();
  }

  async onModuleInit() {
    if (process.env.NODE_ENV !== "production") {
      process.on("beforeExit", async () => {
        await this.$disconnect();
      });
    }

    await this.$connect();
  }

  get client(): PrismaService {
    return TransactionContext.client ?? this;
  }
}
