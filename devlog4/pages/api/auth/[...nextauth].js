import NextAuth from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";

// import User from "../../../models/user";
// import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { db, sql } from "@vercel/postgres";
// import bcrypt from 'bcrypt';

/*export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        dbConnect();

        const { email, password } = credentials;

        const user = await User.findOne({ email });

        if (!user) {
          throw new Error("Invalid Email or Password");
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if (!isPasswordMatched) {
          throw new Error("Invalid Email or Password");
        }

        return user;
      },
      credentials: undefined,
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
});*/

async function getUser(email) {
  try {
    const client = await db.connect();
    const user = await client.sql`SELECT * FROM user_test WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) {
            throw new Error("Invalid Email or Password");
          }
          if (password !== user.password) {
            throw new Error("Invalid Email or Password");
          }
          return user;
        }
      },
      credentials: undefined,
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) {
            throw new Error("Invalid Email or Password");
          }
          if (password !== user.password) {
            throw new Error("Invalid Email or Password");
          }
          return user;
        }
      },
      credentials: undefined,
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
});
