import { di } from "~/server/infra/di";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { AdapterAccount, AdapterUser } from "next-auth/adapters";
import GithubProvider from "next-auth/providers/github";
import { PRISMA_SERVICE, PrismaService } from "~/server/infra/database";

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
    getUser: async (id: string) => {
      const user = await prismaService.user.findUnique({
        where: {
          id: Number(id),
        },
      });
      return user as unknown as AdapterUser;
    },
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
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log(user, account, profile, email, credentials);
      return true;
    },
  },
});

export { handler as GET, handler as POST };
