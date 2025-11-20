import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcrypt";
import type { Adapter } from "next-auth/adapters";

import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.hashedPassword) {
          return null;
        }

        const isValid = await compare(credentials.password, user.hashedPassword);
        if (!isValid) {
          return null;
        }

        // Check if email is verified (only for credentials provider, not OAuth)
        if (!user.emailVerified) {
          throw new Error("Please verify your email before signing in. Check your inbox for the verification link.");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user && "id" in user) {
        (token as { id?: string }).id = (user as { id: string }).id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && "id" in token) {
        (session.user as { id?: string }).id = (token as { id?: string }).id;
      }
      return session;
    },
  },
  events: {
    async signIn({ user, account }) {
      if (account?.provider === "google" && user.email) {
        try {
          await prisma.user.update({
            where: { email: user.email },
            data: { emailVerified: new Date() },
          });
        } catch (error) {
          console.error("Failed to mark Google user as verified", error);
        }
      }
    },
  },
};


