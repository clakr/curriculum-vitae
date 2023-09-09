import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GitHubProvider from "next-auth/providers/github";

const authOptions: NextAuthOptions = {
  callbacks: {
    async signIn({ user }) {
      if (user.id !== process.env.GITHUB_PROFILE_ID) {
        throw new Error("NOT_AUTHORIZED");
      }

      return true;
    },
    async redirect({ url }) {
      return url;
    },
  },
  pages: {
    signIn: "/",
    error: "/",
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
