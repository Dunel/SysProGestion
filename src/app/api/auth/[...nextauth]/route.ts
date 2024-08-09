import axios from "axios";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "test@test.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await axios
          .post(`${process.env.NEXTAUTH_URL}/api/auth/login`, {
            email: credentials?.email,
            password: credentials?.password,
          })
          .catch((err) => {
            throw new Error(err.response.data.error);
          });

        return res.data;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.cedula = user.cedula;
        token.email = user.email;
        token.role = user.role;
        token.profile = user.profile;
      }
      return {...user, ...token};
    },
    async session({ session, token }) {
      session.user.cedula = token.cedula as string;
      session.user.email = token.email as string;
      session.user.profile = token.profile as boolean;
      return session;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
