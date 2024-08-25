import { JWT } from "next-auth";
import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      cedula: number;
      email: string;
      role: "estudiante" | "alcaldia" | "dependencia";
      profile: boolean;
      picture: string;
      dataProfile: {
        address: string;
        university: string;
        career: string;
        quarter: string;
        skills: [string];
        interests: string;
        description: string;
        email: string;
        social: string;
        rif: number | null;
        name: string;
        names: string;
        lastnames: string;
        phone: string;
        curriculum: string;
      };
    };
  }

  interface User {
    cedula: number;
    email: string;
    role: "estudiante" | "alcaldia" | "dependencia";
    profile: boolean;
    picture: string;
    dataProfile: {
      address: string;
      university: string;
      career: string;
      quarter: string;
      skills: [string];
      interests: string;
      description: string;
      email: string;
      social: string;
      rif: number | null;
      name: string;
      names: string;
      lastnames: string;
      phone: string;
      curriculum: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    cedula: number;
    email: string;
    role: "estudiante" | "alcaldia" | "dependencia";
    profile: boolean;
    picture: string;
    dataProfile: {
      address: string;
      university: string;
      career: string;
      quarter: string;
      skills: [string];
      interests: string;
      description: string;
      email: string;
      social: string;
      rif: number | null;
      name: string;
      names: string;
      lastnames: string;
      phone: string;
      curriculum: string;
    };
  }
}
