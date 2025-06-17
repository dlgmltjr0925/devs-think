import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import { AdapterAccount } from "next-auth/adapters";
import GithubProvider from "next-auth/providers/github";

const prisma = new PrismaClient();

const linkAccount = async (account: AdapterAccount) => {
  await prisma.account.create({
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
    ...PrismaAdapter(prisma),
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
