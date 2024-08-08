import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      cedula: string;
      email: string;
      role: string;
      token: string;
      profile: boolean;
    };
  }

  interface User {
    cedula: string;
    email: string;
    role: string;
    profile: boolean;
  }

  interface JWT {
    cedula: string;
    email: string;
    role: string;
    profile: boolean;
  }
}
