import { PrismaClient } from "@prisma/client";
import { injectable } from "tsyringe";

export const PRISMA_SERVICE = Symbol.for("PrismaService");

@injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super();

    console.log("PrismaService constructor");

    if (process.env.NODE_ENV !== "production") {
      process.on("beforeExit", async () => {
        await this.$disconnect();
      });
    }

    this.$connect();
  }
}
