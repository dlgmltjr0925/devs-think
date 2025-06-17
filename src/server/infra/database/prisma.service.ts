import { PrismaClient } from "@prisma/client";
import { Injectable } from "~/server/infra/core";

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

    console.log("PrismaService constructor");

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
}
