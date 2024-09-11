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
        birthdate: date;
        address: string;
        institution: {
          id: number;
          institutionCode: string;
          name: string;
        };
        career: {
          id: number;
          careerCode: string;
          name: string;
        };
        skills: [string];
        interests: string;
        description: string;
        email: string;
        dateStart: Date;
        dateEnd: Date;
        estadoId: number;
        municipioId: number;
        parroquiaId: number;
        estado: string;
        municipio: string;
        parroquia: string;
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
      birthdate: date;
      address: string;
      institution: {
        id: number;
        institutionCode: string;
        name: string;
      };
      career: {
        id: number;
        careerCode: string;
        name: string;
      };
      skills: [string];
      interests: string;
      description: string;
      email: string;
      dateStart: Date;
      dateEnd: Date;
      estadoId: number;
      municipioId: number;
      parroquiaId: number;
      estado: string;
      municipio: string;
      parroquia: string;
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
      birthdate: date;
      address: string;
      institution: {
        id: number;
        institutionCode: string;
        name: string;
      };
      career: {
        id: number;
        careerCode: string;
        name: string;
      };
      skills: [string];
      interests: string;
      description: string;
      email: string;
      dateStart: Date;
      dateEnd: Date;
      estadoId: number;
      municipioId: number;
      parroquiaId: number;
      estado: string;
      municipio: string;
      parroquia: string;
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
