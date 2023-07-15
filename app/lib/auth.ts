import type { NextAuthOptions } from "next-auth";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import { prisma } from "../api/prisma";

export const authOptions: NextAuthOptions = {
  
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID||"",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET||""
    })
  ],
  callbacks: {
    async signIn({ account, profile }: any) {
      if (account?.provider === "google") {
        const user:any = await prisma.user.findUnique({
          where: {
            email: profile?.email
          }
        })
        return profile.email_verified && user?.email == profile?.email
      }
      return false;
    },
  }
};
