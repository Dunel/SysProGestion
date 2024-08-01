import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email", placeholder: "test@test.com" },
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
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
