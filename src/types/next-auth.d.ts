import { JWT } from "next-auth";
import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      cedula: number;
      email: string;
      role: string;
      profile: boolean;
      dataProfile: {
        address: string;
        university: string;
        quarter: string;
        skills: [string];
        interests: string;
        description: string;
        names: string;
        lastnames: string;
        phone: string;
      };
    };
  }

  interface User {
    cedula: number;
    email: string;
    role: string;
    profile: boolean;
    dataProfile: {
      address: string;
      university: string;
      quarter: string;
      skills: [string];
      interests: string;
      description: string;
      names: string;
      lastnames: string;
      phone: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    cedula: number;
    email: string;
    role: string;
    profile: boolean;
    dataProfile: {
      address: string;
      university: string;
      quarter: string;
      skills: [string];
      interests: string;
      description: string;
      names: string;
      lastnames: string;
      phone: string;
    };
  }
}
