import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/libs/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Type augmentation for NextAuth
declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    name?: string | null;
    image?: string | null;
    provider?: string;
    googleId?: string;
    rememberMe?: boolean;
  }
  interface Session {
    user?: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      provider?: string;
      googleId?: string;
    };
    accessToken?: string;
    refreshToken?: string;
  }
}

const ACCESS_TOKEN_EXPIRY = "15m";
const DEFAULT_SESSION_AGE = 60 * 60 * 24 * 7; // 7 days
const REMEMBER_ME_SESSION_AGE = 60 * 60 * 24 * 30; // 30 days

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        rememberMe: { label: "Remember Me", type: "checkbox" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials.password) return null;
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user || !user.password) return null;
        const valid = await bcrypt.compare(credentials.password, user.password);
        if (!valid) return null;
        // Pass rememberMe to token via user object
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          provider: user.provider,
          googleId: user.googleId ?? undefined,
          rememberMe:
            credentials.rememberMe === "true" ||
            credentials.rememberMe === "on",
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google" && user.email) {
        let dbUser = await prisma.user.findUnique({
          where: { email: user.email },
        });
        if (!dbUser) {
          dbUser = await prisma.user.create({
            data: {
              email: user.email,
              name: user.name,
              image: user.image,
              provider: "google",
              googleId: (profile as any).sub,
            },
          });
        }
        (user as any).id = dbUser.id;
        (user as any).provider = dbUser.provider;
        (user as any).googleId = dbUser.googleId;
      }
      return true;
    },

    async jwt({ token, user, account }) {
      // Attach user info to token
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.image = user.image;
        token.provider = user.provider;
        token.googleId = user.googleId;
        token.rememberMe = user.rememberMe;

        // Generate access and refresh tokens
        token.accessToken = jwt.sign(
          { userId: user.id, email: user.email },
          process.env.JWT_SECRET!,
          { expiresIn: ACCESS_TOKEN_EXPIRY }
        );
        token.refreshToken = jwt.sign(
          { userId: user.id, email: user.email },
          process.env.JWT_REFRESH_SECRET!,
          {
            expiresIn: user.rememberMe
              ? REMEMBER_ME_SESSION_AGE
              : DEFAULT_SESSION_AGE,
          }
        );
      }
      return token;
    },

    async session({ session, token }) {
      // Ensure session.user always exists
      if (!session.user) session.user = {};
      session.user.id = token.id as string;
      session.user.email = token.email as string;
      session.user.name = token.name as string;
      session.user.image = token.image as string;
      session.user.provider = token.provider as string;
      session.user.googleId = token.googleId as string;
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: REMEMBER_ME_SESSION_AGE, // Default to 30 days, overridden by jwt callback
    updateAge: 24 * 60 * 60, // 1 day
  },
  pages: { signIn: "/login", error: "/login" },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
