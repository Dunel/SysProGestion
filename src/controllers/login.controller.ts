import { NextRequest, NextResponse } from "next/server";
import { LoginSchema } from "@/validations/login.schema";
import bcrypt from "bcrypt";
import prisma from "@/db";
import { ZodError } from "zod";

type userLogin = {
  email: string;
  password: string;
};

export async function Login(req: NextRequest) {
  try {
    const { email, password }: userLogin = await req.json();
    const result = LoginSchema.parse({ email, password });

    const userFound = await prisma.user.findFirst({
      where: {
        mail: {
          equals: result.email,
          mode: "insensitive",
        },
      },
    });
    if (!userFound) {
      return NextResponse.json(
        { error: "Correo o contraseña incorrecta" },
        { status: 400 }
      );
    }
    const passwordMatch = await bcrypt.compare(
      result.password,
      userFound.password
    );
    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Correo o contraseña incorrecta" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        cedula: userFound.cedula,
        email: userFound.mail,
        role: userFound.role,
        profile: userFound.profile,
        picture: userFound.image,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      );
    }
    console.error("Error: ", (error as Error).message);
    return NextResponse.json(
      { error: "Error en el servidor." },
      { status: 500 }
    );
  }
}
