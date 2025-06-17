import { PrismaClient } from "@prisma/client";
import { injectable } from "tsyringe";

export const PRISMA_SERVICE = Symbol.for("PrismaService");

@injectable()
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
