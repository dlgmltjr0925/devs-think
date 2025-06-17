import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { AdapterAccount } from "next-auth/adapters";
import GithubProvider from "next-auth/providers/github";
import { PRISMA_SERVICE, PrismaService } from "~/server/infra/database";
import { di } from "~/server/infra/di";

const prismaService = di.resolve<PrismaService>(PRISMA_SERVICE);

const linkAccount = async (account: AdapterAccount) => {
  await prismaService.account.create({
    data: {
      userId: Number(account.userId),
      type: account.type,
      provider: account.provider,
      providerAccountId: account.providerAccountId,
      accessToken: account.access_token,
      tokenType: account.token_type,
      scope: account.scope,
    },
  });
};

const handler = NextAuth({
  adapter: {
    ...PrismaAdapter(prismaService),
    linkAccount,
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/sign-in",
    // signOut: '/auth/sign-out',
    // error: '/auth/error',
    // verifyRequest: '/auth/verify-request',
    // newUser: '/auth/new-user'
  },
});

export { handler as GET, handler as POST };
