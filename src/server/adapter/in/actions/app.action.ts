"use server";

import { Action, Inject } from "~/server/infra/core";
import { PRISMA_SERVICE, PrismaService } from "~/server/infra/database";
import { di } from "~/server/infra/di";

@Action
class AppAction {
  constructor(
    @Inject(PRISMA_SERVICE) private readonly prismaService: PrismaService,
  ) {}

  async sum(a: number, b: number) {
    return a + b;
  }
}

export const { sum } = di.resolve(AppAction);
