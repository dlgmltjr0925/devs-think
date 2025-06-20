import { randomUUID } from "crypto";
import { User } from "~/server/domain/user";
import { Inject, Injectable } from "~/server/infra/core";
import { PRISMA_SERVICE, PrismaService } from "~/server/infra/database";

@Injectable()
export class UserTestFeature {
  constructor(
    @Inject(PRISMA_SERVICE) private readonly prismaService: PrismaService,
  ) {}

  async createTestUser(): Promise<User> {
    const testUser = await this.prismaService.user.create({
      data: {
        email: `${randomUUID()}@test.com`,
        name: "test",
        image: "test.png",
      },
    });

    return new User({
      id: testUser.id,
      name: testUser.name,
      email: testUser.email,
      image: testUser.image,
    });
  }

  async deleteTestUser(userId: number): Promise<void> {
    await this.prismaService.user.delete({
      where: {
        id: userId,
      },
    });
  }
}
