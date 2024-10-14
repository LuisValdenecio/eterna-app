import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";

import { db } from "@/lib/db";
import { getUserById } from "@/data/user";

export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks: {
    async session({token, session}) {
      console.log({
        sesssionToken : token
      })
      if (token.sub && session.user) {
        session.user.id = token.sub;
      } 

      return session;
    },
    async jwt({token}) {
      if (!token.sub) return token;
      return token;
    }
  },
  adapter: PrismaAdapter(db),
  session: {strategy : 'jwt'},
  ...authConfig,
})