import { JWT } from "next-auth";
import "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      cedula: number;
      email: string;
      role: string;
      profile: boolean;
    };
  }

  interface User {
    cedula: number;
    email: string;
    role: string;
    profile: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    cedula: number;
    email: string;
    role: string;
    profile: boolean;
  }
}
